from django.core import mail
from django.test import override_settings
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import User
from .tokens import generate_email_verification_token


@override_settings(EMAIL_BACKEND="django.core.mail.backends.locmem.EmailBackend")
class AccountsAuthTests(APITestCase):
    def setUp(self):
        self.register_url = reverse("register")
        self.login_url = reverse("login")
        self.me_url = reverse("me")
        self.refresh_url = reverse("refresh")
        self.verify_email_url = reverse("verify-email")
        self.resend_verification_url = reverse("resend-verification")

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
