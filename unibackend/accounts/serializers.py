from rest_framework import serializers
from .models import User, StudentProfile

# -------------------------------
# User / Admin Serializers
# -------------------------------
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "full_name", "role", "is_active", "is_staff", "created_at"]


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["email", "full_name", "password", "role"]  # role can be 'student' by default

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)


class RefreshSerializer(serializers.Serializer):
    refresh = serializers.CharField()


class VerifyEmailSerializer(serializers.Serializer):
    token = serializers.CharField()


class ResendVerificationSerializer(serializers.Serializer):
    email = serializers.EmailField()


# -------------------------------
# StudentProfile Serializers
# -------------------------------
class StudentProfileSerializer(serializers.ModelSerializer):
    # Nested user info (read-only)
    user = UserSerializer(read_only=True)

    class Meta:
        model = StudentProfile
        fields = ["id", "user", "department", "year", "bio", "external_links"]


class CreateStudentProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProfile
        fields = ["department", "year", "bio", "external_links"]

    def create(self, validated_data):
        # link to the logged-in user
        user = self.context["request"].user
        return StudentProfile.objects.create(user=user, **validated_data)
