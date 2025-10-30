from django.contrib import admin
from .models import Skill, Project, Experience, Education, Certification


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ["name", "description", "created_at", "updated_at"]
    search_fields = ["name", "description"]
    list_filter = ["created_at", "updated_at"]
    ordering = ["created_at"]


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ["title", "description", "production_link", "github_link", "image", "created_at", "updated_at"]
    search_fields = ["title", "description", "production_link", "github_link"]
    list_filter = ["created_at", "updated_at"]
    ordering = ["created_at"]


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ["position", "company", "start_date", "end_date", "is_current", "location"]
    search_fields = ["position", "company", "description", "location"]
    list_filter = ["is_current", "start_date", "created_at"]
    filter_horizontal = ["skills"]
    ordering = ["-start_date"]


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ["degree", "institution", "field_of_study", "start_date", "end_date", "gpa"]
    search_fields = ["degree", "institution", "field_of_study", "description"]
    list_filter = ["start_date", "created_at"]
    ordering = ["-start_date"]


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ["name", "issuing_organization", "issue_date", "credential_id"]
    search_fields = ["name", "issuing_organization", "description", "credential_id"]
    list_filter = ["issue_date", "created_at"]
    ordering = ["-issue_date"]
