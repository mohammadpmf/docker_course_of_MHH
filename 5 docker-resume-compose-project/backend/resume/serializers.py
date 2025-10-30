from rest_framework import serializers
from .models import Skill, Project, Experience, Education, Certification


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ["id", "name"]


class ProjectSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True)

    class Meta:
        model = Project
        fields = ["id", "title", "description", "production_link", "github_link", "image", "skills"]


class ExperienceSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True)

    class Meta:
        model = Experience
        fields = ["id", "company", "position", "description", "start_date", "end_date", "location", "company_website", "skills", "is_current"]


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ["id", "institution", "degree", "field_of_study", "start_date", "end_date", "gpa", "description", "location"]


class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = ["id", "name", "issuing_organization", "issue_date", "credential_id", "credential_url", "description"]
