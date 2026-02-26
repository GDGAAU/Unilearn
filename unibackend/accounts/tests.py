from django.core import mail
from django.test import override_settings
from django.urls import reverse
from unittest.mock import patch
from rest_framework import status
from rest_framework.test import APITestCase

from .models import User
from .tokens import generate_email_verification_token


@override_settings(
    EMAIL_BACKEND="django.core.mail.backends.locmem.EmailBackend",
    GOOGLE_CLIENT_ID="test-google-client-id",
)
class AccountsAuthTests(APITestCase):
    def setUp(self):
        self.register_url = reverse("register")
        self.login_url = reverse("login")
        self.me_url = reverse("me")
        self.refresh_url = reverse("refresh")
        self.verify_email_url = reverse("verify-email")
        self.resend_verification_url = reverse("resend-verification")
        self.google_login_url = reverse("google-login")

        self.password = "StrongPass123!"
        self.user = User.objects.create_user(
            email="student@example.com",
            full_name="Student User",
            password=self.password,
        )

    def test_register_success_sends_verification_email(self):
        payload = {
            "email": "newuser@example.com",
            "full_name": "New User",
            "password": "AnotherStrong123!",
            "role": "student",
        }
        response = self.client.post(self.register_url, payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data["success"])
        created_user = User.objects.get(email=payload["email"])
        self.assertFalse(created_user.is_email_verified)
        self.assertEqual(len(mail.outbox), 1)
        self.assertIn(payload["email"], mail.outbox[0].to)

    def test_login_blocked_for_unverified_user(self):
        response = self.client.post(
            self.login_url,
            {"email": self.user.email, "password": self.password},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertFalse(response.data["success"])

    def test_login_success_for_verified_user(self):
        self.user.is_email_verified = True
        self.user.save(update_fields=["is_email_verified"])

        response = self.client.post(
            self.login_url,
            {"email": self.user.email, "password": self.password},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data["success"])
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

    def test_verify_email_success(self):
        token = generate_email_verification_token(self.user)
        response = self.client.post(
            self.verify_email_url,
            {"token": token},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data["success"])
        self.user.refresh_from_db()
        self.assertTrue(self.user.is_email_verified)
        self.assertIsNotNone(self.user.email_verified_at)

    def test_verify_email_fails_for_expired_token(self):
        token = generate_email_verification_token(self.user)
        with self.settings(EMAIL_VERIFY_TOKEN_MINUTES=-1):
            response = self.client.post(
                self.verify_email_url,
                {"token": token},
                format="json",
            )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(response.data["success"])

    def test_resend_verification_sends_email_for_unverified_user(self):
        response = self.client.post(
            self.resend_verification_url,
            {"email": self.user.email},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data["success"])
        self.assertEqual(len(mail.outbox), 1)

    def test_me_requires_authentication(self):
        response = self.client.get(self.me_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    @patch("google.oauth2.id_token.verify_oauth2_token")
    def test_google_login_success_creates_verified_user(self, mock_verify):
        mock_verify.return_value = {
            "email": "google-user@example.com",
            "email_verified": True,
            "name": "Google User",
        }

        response = self.client.post(
            self.google_login_url,
            {"id_token": "valid-google-id-token"},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data["success"])
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

        user = User.objects.get(email="google-user@example.com")
        self.assertTrue(user.is_email_verified)
        self.assertIsNotNone(user.email_verified_at)

    @patch("google.oauth2.id_token.verify_oauth2_token")
    def test_google_login_success_for_existing_user(self, mock_verify):
        existing_user = User.objects.create_user(
            email="existing-google@example.com",
            full_name="Existing User",
            password="StrongPass123!",
        )
        mock_verify.return_value = {
            "email": existing_user.email,
            "email_verified": True,
            "name": "Existing User",
        }

        response = self.client.post(
            self.google_login_url,
            {"id_token": "valid-google-id-token"},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data["success"])
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)
        self.assertEqual(User.objects.filter(email=existing_user.email).count(), 1)
        existing_user.refresh_from_db()
        self.assertTrue(existing_user.is_email_verified)

    @patch("google.oauth2.id_token.verify_oauth2_token")
    def test_google_login_fails_for_unverified_google_email(self, mock_verify):
        mock_verify.return_value = {
            "email": "google-user@example.com",
            "email_verified": False,
            "name": "Google User",
        }

        response = self.client.post(
            self.google_login_url,
            {"id_token": "token-with-unverified-email"},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertFalse(response.data["success"])

    @patch("google.oauth2.id_token.verify_oauth2_token", side_effect=ValueError("bad token"))
    def test_google_login_fails_for_invalid_token(self, _mock_verify):
        response = self.client.post(
            self.google_login_url,
            {"id_token": "invalid-token"},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertFalse(response.data["success"])

    @override_settings(GOOGLE_CLIENT_ID="")
    def test_google_login_fails_when_not_configured(self):
        response = self.client.post(
            self.google_login_url,
            {"id_token": "any-token"},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertFalse(response.data["success"])
