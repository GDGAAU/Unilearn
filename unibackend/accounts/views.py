from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView


class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        return Response({"success": True, "message": "register endpoint ready"})


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        return Response({"success": True, "message": "login endpoint ready"})


class MeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response({"success": True, "message": "me endpoint ready"})


class RefreshTokenView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        return Response({"success": True, "message": "refresh endpoint ready"})
