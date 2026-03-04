from django.contrib import admin

from .models import Activity, LeaderboardEntry, Team, WorkoutSuggestion


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('name', 'owner', 'created_at')
    search_fields = ('name', 'owner__username')


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ('activity_type', 'user', 'team', 'duration_minutes', 'performed_at')
    list_filter = ('activity_type', 'performed_at')
    search_fields = ('user__username', 'team__name')


@admin.register(LeaderboardEntry)
class LeaderboardEntryAdmin(admin.ModelAdmin):
    list_display = ('team', 'user', 'rank', 'score', 'updated_at')
    list_filter = ('team',)
    search_fields = ('team__name', 'user__username')


@admin.register(WorkoutSuggestion)
class WorkoutSuggestionAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'difficulty', 'duration_minutes', 'is_active', 'generated_at')
    list_filter = ('difficulty', 'is_active')
    search_fields = ('title', 'user__username')