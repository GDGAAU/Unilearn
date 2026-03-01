from django.contrib import admin
from .models import Course


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("course_code", "course_name", "department", "year")
    search_fields = ("course_code", "course_name", "department")
    list_filter = ("department", "year")
