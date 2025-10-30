from rest_framework import viewsets
from rest_framework.permissions import BasePermission
from .models import Skill, Project, Experience, Education, Certification
from .serializers import SkillSerializer, ProjectSerializer, ExperienceSerializer, EducationSerializer, CertificationSerializer


class IsSuperUserOrReadOnly(BasePermission):
    """
    Custom permission to only allow superusers to edit objects.
    All users can view (GET) but only superusers can create/update/delete.
    """

    def has_permission(self, request, view):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in ["GET", "HEAD", "OPTIONS"]:
            return True

        # Write permissions are only allowed to superusers.
        return request.user and request.user.is_authenticated and request.user.is_staff


class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [IsSuperUserOrReadOnly]


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsSuperUserOrReadOnly]


class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer
    permission_classes = [IsSuperUserOrReadOnly]


class EducationViewSet(viewsets.ModelViewSet):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer
    permission_classes = [IsSuperUserOrReadOnly]


class CertificationViewSet(viewsets.ModelViewSet):
    queryset = Certification.objects.all()
    serializer_class = CertificationSerializer
    permission_classes = [IsSuperUserOrReadOnly]
