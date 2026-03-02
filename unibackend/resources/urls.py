from django.urls import path
from . import views

urlpatterns = [
    path("", views.ResourceListCreateView.as_view()),
    path("<int:pk>/", views.ResourceDetailView.as_view()),
    path("<int:pk>/rate/", views.rate_resource),
]