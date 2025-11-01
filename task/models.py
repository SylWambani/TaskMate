from django.db import models
#from django.contrib.auth.models import User as AbstractUser
from django.conf import settings


class Users(models.Model):
    first_name = models.CharField(max_length= 20)
    last_name = models.CharField(max_length=20)
    email = models.EmailField(unique=True)


class TaskStatus(models.TextChoices):
    PENDING = 'PENDING', 'Pending'
    IN_PROGRESS = 'IN_PROGRESS', 'In Progress'
    COMPLETE = 'COMPLETE', 'Complete'

class Priority(models.TextChoices):
    HIGH = 'HIGH', 'High'
    MEDIUM = 'MEDIUM', 'Medium'
    LOW = 'LOW', 'Low'


class Task(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    due_date = models.DateTimeField()
    completed = models.CharField(max_length=20, choices= TaskStatus.choices, default=TaskStatus.PENDING)
    priority = models.CharField(max_length=20, choices=Priority.choices, default=Priority.LOW)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete= models.CASCADE)

    def __str__(self):
        return self.title
 