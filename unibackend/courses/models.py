from django.db import models


class Course(models.Model):
    course_name = models.CharField(max_length=255)
    department = models.CharField(max_length=255)
    year = models.CharField(max_length= 100)

    def __str__(self):
        return f"{self.course_code} - {self.course_name}"
