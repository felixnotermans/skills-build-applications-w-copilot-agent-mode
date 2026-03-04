from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Activity, LeaderboardEntry, Team, WorkoutSuggestion


class ObjectIdStringField(serializers.Field):
    def to_representation(self, value):
        return str(value)

    def to_internal_value(self, data):
        return data


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']


class TeamSerializer(serializers.ModelSerializer):
    id = ObjectIdStringField(read_only=True)
    owner = serializers.PrimaryKeyRelatedField(read_only=True)
    members = serializers.PrimaryKeyRelatedField(many=True, queryset=User.objects.all(), required=False)

    class Meta:
        model = Team
        fields = ['id', 'name', 'description', 'owner', 'members', 'created_at']
        read_only_fields = ['created_at']


class ActivitySerializer(serializers.ModelSerializer):
    id = ObjectIdStringField(read_only=True)

    class Meta:
        model = Activity
        fields = [
            'id',
            'user',
            'team',
            'activity_type',
            'duration_minutes',
            'calories_burned',
            'performed_at',
            'created_at',
        ]
        read_only_fields = ['created_at']


class LeaderboardEntrySerializer(serializers.ModelSerializer):
    id = ObjectIdStringField(read_only=True)

    class Meta:
        model = LeaderboardEntry
        fields = ['id', 'team', 'user', 'score', 'rank', 'updated_at']
        read_only_fields = ['updated_at']


class WorkoutSuggestionSerializer(serializers.ModelSerializer):
    id = ObjectIdStringField(read_only=True)

    class Meta:
        model = WorkoutSuggestion
        fields = [
            'id',
            'user',
            'title',
            'description',
            'difficulty',
            'duration_minutes',
            'generated_at',
            'is_active',
        ]
        read_only_fields = ['generated_at']