from django.db import models
from courses.models import Course

class Instructor(models.Model):
    name = models.CharField(max_length=255)
    bio = models.TextField(blank=True)
    courses = models.ManyToManyField(Course, related_name="instructors")

    def __str__(self):
        return self.name


class InstructorInsight(models.Model):
    STATUS_CHOICES = (
        ("pending", "Pending"),
        ("approved", "Approved"),
        ("rejected", "Rejected"),
    )

    instructor = models.ForeignKey(Instructor, on_delete=models.CASCADE, related_name="insights")
    teaching_style = models.CharField(max_length=255)
    assessment_type = models.CharField(max_length=255)
    workload_level = models.CharField(max_length=100)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Insight for {self.instructor.name}"
