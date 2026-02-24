from django.contrib import admin
from .models import User, StudentProfile


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("email", "full_name", "role", "is_staff", "is_active")
    search_fields = ("email", "full_name")
    list_filter = ("role", "is_staff")


@admin.register(StudentProfile)
class StudentProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "department", "year")
    search_fields = ("user__email",)