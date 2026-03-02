from django.urls import path
from . import views

urlpatterns = [
    # Admin
    path("admin/", views.AdminInstructorListCreateView.as_view()),
    path("admin/<int:pk>/", views.AdminInstructorDetailView.as_view()),
    path("admin/insights/<int:pk>/approve/", views.AdminInstructorInsightApproveView.as_view()),

    # Public
    path("<int:instructor_id>/insights/", views.InstructorInsightCreateView.as_view()),
    path("<int:instructor_id>/insights/list/", views.InstructorInsightListView.as_view()),
]
