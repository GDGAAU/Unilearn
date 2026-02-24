from django.db import models
from courses.models import Course


class Project(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="projects"
    )

    screenshots = models.JSONField(default=list, blank=True)
    tech_stack = models.JSONField(default=list, blank=True)

    github_link = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title