from datetime import timedelta

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from django.utils import timezone

from octofit_tracker.models import Activity, LeaderboardEntry, Team, WorkoutSuggestion


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        user_model = get_user_model()

        user, _ = user_model.objects.get_or_create(
            username='octofit_test_user',
            defaults={
                'email': 'octofit_test_user@example.com',
            },
        )

        if not user.has_usable_password():
            user.set_password('octofit-test-password')
            user.save(update_fields=['password'])

        team, _ = Team.objects.get_or_create(
            name='OctoFit Test Team',
            defaults={
                'description': 'Default team for OctoFit test data.',
                'owner': user,
            },
        )

        if team.owner_id != user.id:
            team.owner = user
            team.save(update_fields=['owner'])

        team.members.add(user)

        activity_defaults = {
            'team': team,
            'duration_minutes': 45,
            'calories_burned': 380,
            'performed_at': timezone.now() - timedelta(hours=1),
        }
        Activity.objects.get_or_create(
            user=user,
            activity_type='run',
            defaults=activity_defaults,
        )

        LeaderboardEntry.objects.get_or_create(
            team=team,
            user=user,
            defaults={
                'score': 380,
                'rank': 1,
            },
        )

        WorkoutSuggestion.objects.get_or_create(
            user=user,
            title='Starter Endurance Session',
            defaults={
                'description': '30 min easy run + 15 min mobility routine.',
                'difficulty': 'beginner',
                'duration_minutes': 45,
                'is_active': True,
            },
        )

        self.stdout.write(self.style.SUCCESS('Test data populated successfully.'))