from django.db import models


class Course(models.Model):
    course_code = models.CharField(max_length=50, unique=True)
    course_name = models.CharField(max_length=255)
    department = models.CharField(max_length=255)
    year = models.PositiveSmallIntegerField()
    description = models.TextField()

    def __str__(self):
        return f"{self.course_code} - {self.course_name}"
