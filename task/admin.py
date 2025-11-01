from django.contrib import admin
from . import models

@admin.register(models.Task)
class PostAdmin(admin.ModelAdmin):
    list_display = ['title', 'description', 'due_date', 'completed', 'priority', 'user']
    list_select_related = ['user']
    list_per_page = 5
    list_filter = ['completed', 'priority', 'user']
    search_fields = ['user']

    #def collection_title(self, post):
        #return post.collection.title
    