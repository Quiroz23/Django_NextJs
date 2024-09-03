from django.db import models

# Create your models here.

class Task(models.Model):
    tittle = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    done = models.BooleanField(default=False)
    created_at = models.DateField(auto_now_add=True)
