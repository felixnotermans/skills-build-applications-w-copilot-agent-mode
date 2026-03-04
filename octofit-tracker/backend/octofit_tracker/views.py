from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

from .models import Activity, LeaderboardEntry, Team, WorkoutSuggestion
from .serializers import (
    ActivitySerializer,
    LeaderboardEntrySerializer,
    TeamSerializer,
    UserSerializer,
    WorkoutSuggestionSerializer,
)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('username')
    serializer_class = UserSerializer


class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all().order_by('-created_at')
    serializer_class = TeamSerializer

    def perform_create(self, serializer):
        owner = self.request.user if self.request.user.is_authenticated else None
        if owner is None:
            owner = User.objects.order_by('id').first()
        serializer.save(owner=owner)


class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all().order_by('-performed_at')
    serializer_class = ActivitySerializer


class LeaderboardEntryViewSet(viewsets.ModelViewSet):
    queryset = LeaderboardEntry.objects.select_related('team', 'user').all().order_by('rank', '-score')
    serializer_class = LeaderboardEntrySerializer


class WorkoutSuggestionViewSet(viewsets.ModelViewSet):
    queryset = WorkoutSuggestion.objects.select_related('user').all().order_by('-generated_at')
    serializer_class = WorkoutSuggestionSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        user_id = self.request.query_params.get('user')
        if user_id:
            queryset = queryset.filter(user_id=user_id)
        is_active = self.request.query_params.get('is_active')
        if is_active is not None:
            queryset = queryset.filter(is_active=is_active.lower() == 'true')
        return queryset


@api_view(['GET'])
def api_root(request, format=None):
    return Response(
        {
            'users': reverse('user-list', request=request, format=format),
            'teams': reverse('team-list', request=request, format=format),
            'activities': reverse('activity-list', request=request, format=format),
            'leaderboard': reverse('leaderboardentry-list', request=request, format=format),
            'workouts': reverse('workoutsuggestion-list', request=request, format=format),
        }
    )