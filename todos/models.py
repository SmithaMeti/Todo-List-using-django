from django.db import models

# Create your models here.
class Todo(models.Model):
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=1000)
    created_at = models.DateTimeField(auto_now_add = True)
    completed = models.BooleanField(default=False)