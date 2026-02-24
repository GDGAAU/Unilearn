from django.contrib import admin
from .models import Project


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "course", "created_at")
    search_fields = ("title",)
    list_filter = ("course",)