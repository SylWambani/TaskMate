from django.test import TestCase
from rest_framework_simplejwt.tokens import AccessToken
token = AccessToken('<your-token-here>')
token['user_id']
