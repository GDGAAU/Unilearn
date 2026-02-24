from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Resource, ResourceRating
from .serializers import ResourceSerializer, ResourceRatingSerializer


# CRUD

class ResourceListCreateView(generics.ListCreateAPIView):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer


class ResourceDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer


# Rating

@api_view(["POST"])
def rate_resource(request, pk):
    try:
        resource = Resource.objects.get(pk=pk)
    except Resource.DoesNotExist:
        return Response({"error": "Resource not found"}, status=404)

    serializer = ResourceRatingSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(resource=resource)
        return Response({"success": True, "message": "Rated successfully"})
    return Response(serializer.errors, status=400)