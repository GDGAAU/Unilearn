from django.conf import settings
from django.core.mail import send_mail
from django.utils import timezone
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
from .serializers import (
    GoogleLoginSerializer,
    LoginSerializer,
    RefreshSerializer,
    RegisterSerializer,
    ResendVerificationSerializer,
    UserSerializer,
    VerifyEmailSerializer,
)
from .tokens import (
    EmailVerificationTokenError,
    generate_email_verification_token,
    validate_email_verification_token,
)


def _send_verification_email(user):
    token = generate_email_verification_token(user)
    verify_url_base = getattr(settings, "FRONTEND_VERIFY_EMAIL_URL", "").strip()
    verify_target = f"{verify_url_base}?token={token}" if verify_url_base else token
    message = (
        "Welcome to UniLearn.\n\n"
        "Verify your email with this token/link:\n"
        f"{verify_target}\n\n"
        "If you did not create this account, ignore this message."
    )
    send_mail(
        subject="Verify your UniLearn email",
        message=message,
        from_email=getattr(settings, "DEFAULT_FROM_EMAIL", "no-reply@unilearn.local"),
        recipient_list=[user.email],
        fail_silently=True,
    )


def _issue_jwt_tokens(user):
    refresh = RefreshToken.for_user(user)
    return str(refresh.access_token), str(refresh)


class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            _send_verification_email(user)
            return Response(
                {
                    "success": True,
                    "message": "User registered successfully. Please verify your email before login.",
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(
            {
                "success": False,
                "message": "Registration failed",
                "errors": serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {
                    "success": False,
                    "message": "Login failed",
                    "errors": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        email = serializer.validated_data["email"]
        password = serializer.validated_data["password"]

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {"success": False, "message": "Invalid credentials"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        if not user.check_password(password):
            return Response(
                {"success": False, "message": "Invalid credentials"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        if not user.is_email_verified:
            return Response(
                {
                    "success": False,
                    "message": "Please verify your email before login",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        access, refresh = _issue_jwt_tokens(user)
        return Response(
            {
                "success": True,
                "message": "Login successful",
                "access": access,
                "refresh": refresh,
            },
            status=status.HTTP_200_OK,
        )


class MeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user_data = UserSerializer(request.user).data
        return Response(
            {
                "success": True,
                "message": "User profile fetched successfully",
                "data": user_data,
            },
            status=status.HTTP_200_OK,
        )


class RefreshTokenView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RefreshSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {
                    "success": False,
                    "message": "Refresh failed",
                    "errors": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        refresh_value = serializer.validated_data["refresh"]
        try:
            refresh = RefreshToken(refresh_value)
            access = str(refresh.access_token)
        except TokenError:
            return Response(
                {"success": False, "message": "Invalid or expired refresh token"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        return Response(
            {
                "success": True,
                "message": "Token refreshed successfully",
                "access": access,
            },
            status=status.HTTP_200_OK,
        )


class VerifyEmailView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = VerifyEmailSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {"success": False, "message": "Verification failed", "errors": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            user = validate_email_verification_token(serializer.validated_data["token"])
        except EmailVerificationTokenError as exc:
            return Response(
                {"success": False, "message": str(exc)},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if user.is_email_verified:
            return Response(
                {"success": True, "message": "Email already verified"},
                status=status.HTTP_200_OK,
            )

        user.is_email_verified = True
        user.email_verified_at = timezone.now()
        user.save(update_fields=["is_email_verified", "email_verified_at"])

        return Response(
            {"success": True, "message": "Email verified successfully"},
            status=status.HTTP_200_OK,
        )


class ResendVerificationView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = ResendVerificationSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {"success": False, "message": "Resend failed", "errors": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST,
            )

        email = serializer.validated_data["email"]
        user = User.objects.filter(email=email).first()

        if user and not user.is_email_verified:
            _send_verification_email(user)

        return Response(
            {"success": True, "message": "If the account exists, a verification email was sent"},
            status=status.HTTP_200_OK,
        )


class GoogleLoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = GoogleLoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {"success": False, "message": "Google login failed", "errors": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not settings.GOOGLE_CLIENT_ID:
            return Response(
                {"success": False, "message": "Google login is not configured"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        token_value = serializer.validated_data["id_token"]

        try:
            from google.auth.transport import requests as google_requests
            from google.oauth2 import id_token as google_id_token

            token_info = google_id_token.verify_oauth2_token(
                token_value,
                google_requests.Request(),
                settings.GOOGLE_CLIENT_ID,
            )
        except Exception:
            return Response(
                {"success": False, "message": "Invalid Google token"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        email = token_info.get("email")
        email_verified = token_info.get("email_verified")
        full_name = token_info.get("name") or "Google User"

        if not email or not email_verified:
            return Response(
                {"success": False, "message": "Google account email is not verified"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        user, created = User.objects.get_or_create(
            email=email,
            defaults={
                "full_name": full_name,
                "role": "student",
            },
        )

        update_fields = []
        if created:
            user.set_unusable_password()
            update_fields.append("password")

        if not user.full_name:
            user.full_name = full_name
            update_fields.append("full_name")

        if not user.is_email_verified:
            user.is_email_verified = True
            user.email_verified_at = timezone.now()
            update_fields.extend(["is_email_verified", "email_verified_at"])

        if update_fields:
            user.save(update_fields=update_fields)

        access, refresh = _issue_jwt_tokens(user)
        return Response(
            {
                "success": True,
                "message": "Google login successful",
                "access": access,
                "refresh": refresh,
            },
            status=status.HTTP_200_OK,
        )
