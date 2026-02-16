from django.urls import path
from . import views

urlpatterns = [
    # Admin
    path("admin/instructors/", views.AdminInstructorListCreateView.as_view()),
    path("admin/instructors/<int:pk>/", views.AdminInstructorDetailView.as_view()),
    path("admin/insights/<int:pk>/approve/", views.AdminInstructorInsightApproveView.as_view()),

    # Public/Student
    path("instructors/<int:instructor_id>/insights/", views.InstructorInsightCreateView.as_view()),
    path("instructors/<int:instructor_id>/insights/list/", views.InstructorInsightListView.as_view()),
]
