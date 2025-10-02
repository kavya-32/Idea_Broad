# backend/ideas/views.py

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Idea
from .serializers import IdeaSerializer

class IdeaViewSet(viewsets.ModelViewSet):
    # Order by upvotes (descending) then creation time (descending)
    queryset = Idea.objects.all().order_by('-upvotes', '-created_at')
    serializer_class = IdeaSerializer
    http_method_names = ['get', 'post', 'patch'] # Restrict methods

    # Custom action to handle the PATCH /api/ideas/{id}/upvote endpoint
    @action(detail=True, methods=['patch'])
    def upvote(self, request, pk=None):
        try:
            idea = Idea.objects.get(pk=pk)
        except Idea.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        idea.upvotes += 1
        idea.save()
        
        # Return the updated object
        serializer = self.get_serializer(idea)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Override create to ensure only 'text' is used and upvotes defaults to 0
def create(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    self.perform_create(serializer)
    headers = self.get_success_headers(serializer.data)
    return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
