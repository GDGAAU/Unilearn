from django.contrib import admin
from django.urls import path, include, re_path
from django.http import HttpResponse
from django.conf import settings
from django.conf.urls.static import static

# Home
def home(request):
    return HttpResponse("Welcome to UniLearn API")

urlpatterns = [
    path('', home, name='home'),
    path('admin/', admin.site.urls),

    # API modules
    path('api/accounts/', include('accounts.urls')),
    path('api/courses/', include('courses.urls')),
    path('api/instructors/', include('instructors.urls')),
    path('api/projects/', include('projects.urls')),
    path('api/resources/', include('resources.urls')),

]

# Serve static files in dev
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)