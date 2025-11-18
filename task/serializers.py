from django.utils import timezone
from rest_framework import serializers
from .models import Task, Users


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['first_name', 'last_name']

class ListSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'due_date','priority', 'completed', 'time_remaining']

    time_remaining = serializers.SerializerMethodField(method_name='get_time_remaining')

    def get_time_remaining(self, task:Task):
        now = timezone.now()
        remaining = task.due_date

        if remaining > now:
            delta = remaining - now
            days = delta.days
            hours, remainder = divmod(delta.seconds, 3600)
            minutes, seconds = divmod(remainder, 60)
            return f"{days}d {hours}h {minutes}m {seconds}s left"
        
        return 'Expired'


class CreateTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['title', 'description', 'due_date', 'priority', 'completed']
        read_only_fields = ['user']

class UpdateTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['title', 'description', 'due_date', 'priority', 'completed']