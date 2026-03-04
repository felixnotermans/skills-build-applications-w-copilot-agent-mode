from bson import ObjectId
from django.contrib.auth.models import User
from django.test import SimpleTestCase
from django.urls import reverse
from rest_framework.test import APIRequestFactory

from .models import WorkoutSuggestion
from .serializers import WorkoutSuggestionSerializer
from .views import api_root


class ApiRoutingTests(SimpleTestCase):
    def test_api_root_is_registered(self):
        url = reverse('api-root')
        self.assertEqual(url, '/api/')

    def test_root_redirects_to_api(self):
        client = self.client
        response = client.get('/')
        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.url, '/api/')

    def test_api_root_payload(self):
        request = APIRequestFactory().get('/api/')
        response = api_root(request)
        self.assertEqual(response.status_code, 200)
        self.assertIn('users', response.data)
        self.assertIn('teams', response.data)
        self.assertIn('activities', response.data)
        self.assertIn('leaderboard', response.data)
        self.assertIn('workouts', response.data)


class SerializerObjectIdTests(SimpleTestCase):
    def test_workout_serializer_renders_object_id_as_string(self):
        user = User(username='demo_user')
        workout = WorkoutSuggestion(
            id=ObjectId(),
            user=user,
            title='Tempo Run',
            description='20 min tempo',
            difficulty='intermediate',
            duration_minutes=20,
            is_active=True,
        )
        serialized = WorkoutSuggestionSerializer(workout).data
        self.assertIsInstance(serialized['id'], str)