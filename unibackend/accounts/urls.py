from django.urls import path
from .views import (
    GoogleLoginView,
    LoginView,
    MeView,
    RefreshTokenView,
    RegisterView,
    ResendVerificationView,
    VerifyEmailView,
)

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("login/", LoginView.as_view()),
    path("me/", MeView.as_view()),
    path("refresh/", RefreshTokenView.as_view()),
    path("verify-email/", VerifyEmailView.as_view()),
    path("resend-verification/", ResendVerificationView.as_view()),
    path("google/", GoogleLoginView.as_view()),
]
