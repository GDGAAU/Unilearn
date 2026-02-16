from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from .managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = (
        ("admin", "Admin"),
        ("student", "Student"),
    )

    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=255)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="student")

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["full_name"]

    objects = UserManager()

    def __str__(self):
        return self.email


from django.conf import settings

class StudentProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="profile")
    department = models.CharField(max_length=100)
    year = models.IntegerField()
    bio = models.TextField(blank=True)
    external_links = models.JSONField(default=dict, blank=True)

    def __str__(self):
        return f"{self.user.full_name} Profile"
