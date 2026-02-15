# accounts/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User

class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    full_name = serializers.CharField()

    class Meta:
        model = User
        fields = ("email", "password", "full_name")

    def validate_email(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Email already exists")
        return value

    def validate_password(self, value):
        if len(value) < 6:
            raise serializers.ValidationError("Password must be at least 6 characters")
        return value

    def create(self, validated_data):
        from .models import Profile

        email = validated_data["email"]
        password = validated_data["password"]
        full_name = validated_data["full_name"]

        user = User.objects.create_user(username=email, password=password)
        Profile.objects.create(user=user, full_name=full_name, role="student")
        return user
