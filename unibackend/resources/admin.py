from django.contrib import admin
from .models import Resource, ResourceRating


@admin.register(Resource)
class ResourceAdmin(admin.ModelAdmin):
    list_display = ("title", "course", "resource_type", "academic_year")
    list_filter = ("resource_type", "academic_year")
    search_fields = ("title",)


@admin.register(ResourceRating)
class ResourceRatingAdmin(admin.ModelAdmin):
    list_display = ("resource", "value")
    list_filter = ("value",)