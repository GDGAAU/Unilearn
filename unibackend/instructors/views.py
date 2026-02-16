from rest_framework import status, permissions, generics
from rest_framework.response import Response
from .models import Instructor, InstructorInsight, Course
from .serializers import (
    InstructorSerializer,
    InstructorInsightSerializer,
    InstructorInsightCreateSerializer,
)
from django.shortcuts import get_object_or_404

# ----------------------
# Admin Endpoints
# ----------------------

class AdminInstructorListCreateView(generics.ListCreateAPIView):
    queryset = Instructor.objects.all()
    serializer_class = InstructorSerializer
    permission_classes = [permissions.IsAdminUser]  # Only admins

class AdminInstructorDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Instructor.objects.all()
    serializer_class = InstructorSerializer
    permission_classes = [permissions.IsAdminUser]  # Only admins

class AdminInstructorInsightApproveView(generics.UpdateAPIView):
    queryset = InstructorInsight.objects.all()
    serializer_class = InstructorInsightSerializer
    permission_classes = [permissions.IsAdminUser]

    def patch(self, request, *args, **kwargs):
        insight = self.get_object()
        status_value = request.data.get("status")
        if status_value not in ["approved", "rejected"]:
            return Response(
                {"success": False, "message": "Invalid status"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        insight.status = status_value
        insight.save()
        return Response(
            {"success": True, "message": f"Insight {status_value} successfully"}
        )

# ----------------------
# Student / Public Endpoints
# ----------------------

class InstructorInsightCreateView(generics.CreateAPIView):
    serializer_class = InstructorInsightCreateSerializer
    permission_classes = [permissions.AllowAny]  # Public for now

    def post(self, request, instructor_id):
        instructor = get_object_or_404(Instructor, id=instructor_id)
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save(instructor=instructor, status="pending")
            return Response(
                {"success": True, "message": "Insight submitted and pending approval"},
                status=status.HTTP_201_CREATED,
            )
        return Response(
            {"success": False, "errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST,
        )

class InstructorInsightListView(generics.ListAPIView):
    serializer_class = InstructorInsightSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        instructor_id = self.kwargs.get("instructor_id")
        return InstructorInsight.objects.filter(
            instructor_id=instructor_id, status="approved"
        )
