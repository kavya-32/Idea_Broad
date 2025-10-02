# backend/ideas/serializers.py

from rest_framework import serializers
from .models import Idea

class IdeaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Idea
        # The fields exposed by the API
        fields = ['id', 'text', 'upvotes', 'created_at'] 
        # Only text is writable on creation
        read_only_fields = ['id', 'upvotes', 'created_at']