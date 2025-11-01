from django.shortcuts import render
from django.contrib import messages
from rest_framework.permissions import AllowAny, DjangoModelPermissions, DjangoModelPermissionsOrAnonReadOnly, IsAdminUser, IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.filters import SearchFilter
from rest_framework.mixins import CreateModelMixin, RetrieveModelMixin, ListModelMixin, UpdateModelMixin
from .serializers import CreateTaskSerializer, ListSerializer
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

    @action(detail=False, methods=['GET', 'PUT'], permission_classes=[IsAuthenticated])
    def me(self, request):
        customer = Task.objects.get(
            user_id=request.user.id)
        if request.method == 'GET':
            serializer = ListSerializer(customer)
            return Response(serializer.data)
        elif request.method == 'PUT':
            serializer = ListSerializer(customer, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)



class CreateTaskViewSet(CreateModelMixin, GenericViewSet):
    serializer_class = CreateTaskSerializer
    #permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

   
