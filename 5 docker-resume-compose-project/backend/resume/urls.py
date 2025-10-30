from django.urls import path, include
from rest_framework_nested import routers

from . import views

router = routers.DefaultRouter()
router.register(r"skills", views.SkillViewSet)
router.register(r"projects", views.ProjectViewSet)
router.register(r"experiences", views.ExperienceViewSet)
router.register(r"education", views.EducationViewSet)
router.register(r"certifications", views.CertificationViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
