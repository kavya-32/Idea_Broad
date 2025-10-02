# backend/ideas/models.py

from django.db import models

class Idea(models.Model):
    # max_length corresponds to the 280 characters limit
    text = models.CharField(max_length=280) 
    upvotes = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text[:50]