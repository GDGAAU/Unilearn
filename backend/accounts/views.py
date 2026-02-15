from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


#@route api/auth/register
#@desc Register a new user
#@access Public
@api_view(["POST"])
def register(request):
    data = request.data
    return Response(
        {
            "message": "User registered successfully",
            "full_name": data.get("full_name"),
            "email": data.get("email"),
        },
        status=status.HTTP_201_CREATED,
    )

#@route api/auth/login
#@desc Authenticate user and return tokens
#@access Public
@api_view(["POST"])
def login(request):
    return Response(
        {
            "message": "User logged in successfully",
            "access": "access-token",
            "refresh": "refresh-token",
        }
    )

#@route api/auth/refresh
#@desc Refresh access token using refresh token
#@access Public
@api_view(["POST"])
def refresh_token(request):
    return Response(
        {
            "message": "Access token refreshed successfully",
            "access": "new-access-token",
        }
    )

#@route api/auth/me
#@desc Get current user profile
#@access Private
@api_view(["GET"])
def me(request):
    return Response(
        {
            "message": "Current user profile retrieved successfully",
            "id": "uuid",
            "full_name": "dagm yibabe",
            "email": "dagm@example.com",
            "role": "student",
        }
    )
