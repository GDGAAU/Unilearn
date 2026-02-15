from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate


from .serializers import RegisterSerializer


#@route api/auth/register

#@desc Register a new user
#@access Public
@api_view(["POST"])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response(
            {
                "message": "User registered successfully",
                "id": user.id,
                "email": user.username,
                "full_name": user.profile.full_name,
                "role": user.profile.role,
            },
            status=status.HTTP_201_CREATED,
        )
        
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



#@route api/auth/login
#@desc Authenticate user and return tokens
#@access Public
@api_view(["POST"])
def login(request):
    email = request.data.get("email")
    password = request.data.get("password")

    user = authenticate(username=email, password=password)
    if user is None:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

    refresh = RefreshToken.for_user(user)
    return Response({
        "message": "Login successful",
        "access": str(refresh.access_token),
        "refresh": str(refresh)
    })

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
