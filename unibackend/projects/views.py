from rest_framework import generics
from .models import Project
from .serializers import ProjectSerializer


class ProjectListCreateView(generics.ListCreateAPIView):
    serializer_class = ProjectSerializer

    def get_queryset(self):
        queryset = Project.objects.all()
        course_id = self.request.query_params.get("course")
        tech = self.request.query_params.get("tech")

        if course_id:
            queryset = queryset.filter(course_id=course_id)

        if tech:
            queryset = queryset.filter(tech_stack__icontains=tech)

        return queryset


class ProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer