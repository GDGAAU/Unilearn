from rest_framework import serializers
from .models import Instructor, InstructorInsight
from courses.models import Course


# -----------------------------------
# Instructor Serializer (Admin CRUD)
# -----------------------------------

class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = ["id", "name", "bio", "courses"]


# -----------------------------------
# Insight Creation (Student)
# -----------------------------------

class InstructorInsightCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstructorInsight
        fields = ["teaching_style", "assessment_type", "workload_level"]

    def create(self, validated_data):
        instructor = self.context.get("instructor")
        return InstructorInsight.objects.create(
            instructor=instructor,
            status="pending",
            **validated_data
        )


# -----------------------------------
# Insight View (Public + Admin)
# -----------------------------------

class InstructorInsightSerializer(serializers.ModelSerializer):
    instructor_name = serializers.CharField(source="instructor.name", read_only=True)

    class Meta:
        model = InstructorInsight
        fields = [
            "id",
            "instructor",
            "instructor_name",
            "teaching_style",
            "assessment_type",
            "workload_level",
            "status",
            "created_at",
        ]
        read_only_fields = ["status", "created_at"]