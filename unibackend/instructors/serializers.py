from rest_framework import serializers
from .models import Instructor, InstructorInsight

class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = ["id", "name", "bio", "courses"]

class InstructorInsightSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstructorInsight
        fields = ["id", "instructor", "teaching_style", "assessment_type", "workload_level", "status", "created_at"]
