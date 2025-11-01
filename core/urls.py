from django.conf import settings
from django.contrib.auth import views as auth_views
from django.views.generic import TemplateView
from django.urls import path

# URLConf
urlpatterns = [
    path('', TemplateView.as_view(template_name='core/index.html')),
    path('login/', auth_views.LoginView.as_view(template_name='core/login.html'), name='login'),
    path('signup/', TemplateView.as_view(template_name='core/signup.html'), name='signup'),
    path('tasks/', TemplateView.as_view(template_name='core/tasks.html'), name='tasks'),
]
