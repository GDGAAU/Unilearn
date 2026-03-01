from django.contrib import admin
from .models import Instructor, InstructorInsight


@admin.register(Instructor)
class InstructorAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)


@admin.register(InstructorInsight)
class InstructorInsightAdmin(admin.ModelAdmin):
    list_display = ("instructor", "status", "created_at")
    list_filter = ("status",)