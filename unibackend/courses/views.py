from rest_framework import generics, permissions
from .models import Course
from .serializers import CourseSerializer


class CourseListCreateView(generics.ListCreateAPIView):
    serializer_class = CourseSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = Course.objects.all()
        department = self.request.query_params.get("department")
        year = self.request.query_params.get("year")

        if department:
            queryset = queryset.filter(department__iexact=department)
        if year:
            queryset = queryset.filter(year=year)

        return queryset


class CourseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.AllowAny]
