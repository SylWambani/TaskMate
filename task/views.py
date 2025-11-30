from django.shortcuts import render
from django.contrib import messages
from rest_framework.permissions import AllowAny, DjangoModelPermissions, DjangoModelPermissionsOrAnonReadOnly, IsAdminUser, IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.filters import SearchFilter
from rest_framework.mixins import CreateModelMixin, RetrieveModelMixin, ListModelMixin, UpdateModelMixin
from .serializers import CreateTaskSerializer, ListSerializer, UpdateTaskSerializer
from .models import Task


class ListTaskViewSet(ModelViewSet):
    serializer_class = ListSerializer
    http_method_names = ['get', 'put', 'patch', 'delete', 'head', 'options']
    filter_backends = [SearchFilter]
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    search_fields = ['completed']

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user) 

   



class CreateTaskViewSet(CreateModelMixin, GenericViewSet):
    serializer_class = CreateTaskSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

   
class UpdateTaskViewSet(ModelViewSet):
    serializer_class= UpdateTaskSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)

       


