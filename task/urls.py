from django.urls import path
from rest_framework_nested import routers
from . import views


router = routers.DefaultRouter()
router.register('tasks', views.ListTaskViewSet, basename='tasks')
router.register('add-task', views.CreateTaskViewSet, basename='add-task')


urlpatterns = router.urls
