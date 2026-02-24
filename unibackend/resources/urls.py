from django.urls import path
from . import views

urlpatterns = [
    path("resources/", views.ResourceListCreateView.as_view()),
    path("resources/<int:pk>/", views.ResourceDetailView.as_view()),
    path("resources/<int:pk>/rate/", views.rate_resource),
]