from django.db import models
from courses.models import Course


class Resource(models.Model):
    RESOURCE_TYPES = (
        ("notes", "Notes"),
        ("slides", "Slides"),
        ("exams", "Exams"),
    )

    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="resources")
    title = models.CharField(max_length=255)
    resource_type = models.CharField(max_length=20, choices=RESOURCE_TYPES)
    academic_year = models.CharField(max_length=10)
    file_url = models.URLField()
    tags = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class ResourceRating(models.Model):
    resource = models.ForeignKey(Resource, on_delete=models.CASCADE, related_name="ratings")
    value = models.IntegerField()

    def __str__(self):
        return f"{self.resource.title} - {self.value}"