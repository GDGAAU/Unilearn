from django.conf import settings
from django.core import signing

from .models import User

EMAIL_VERIFICATION_SALT = "accounts.email_verification"


class EmailVerificationTokenError(ValueError):
    """Raised when an email verification token is invalid or expired."""


def generate_email_verification_token(user: User) -> str:
    payload = {
        "user_id": user.id,
        "email": user.email,
    }
    return signing.dumps(payload, salt=EMAIL_VERIFICATION_SALT)


def validate_email_verification_token(token: str) -> User:
    max_age_seconds = int(getattr(settings, "EMAIL_VERIFY_TOKEN_MINUTES", 30)) * 60

    try:
        payload = signing.loads(
            token,
            salt=EMAIL_VERIFICATION_SALT,
            max_age=max_age_seconds,
        )
    except signing.SignatureExpired as exc:
        raise EmailVerificationTokenError("Verification token has expired") from exc
    except signing.BadSignature as exc:
        raise EmailVerificationTokenError("Invalid verification token") from exc

    user_id = payload.get("user_id")
    email = payload.get("email")

    if not user_id or not email:
        raise EmailVerificationTokenError("Invalid verification token payload")

    try:
        return User.objects.get(id=user_id, email=email)
    except User.DoesNotExist as exc:
        raise EmailVerificationTokenError("User for token does not exist") from exc
