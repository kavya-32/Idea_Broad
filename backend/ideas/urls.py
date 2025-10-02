
from rest_framework.routers import DefaultRouter
from .views import IdeaViewSet

router = DefaultRouter()
router.register(r'ideas', IdeaViewSet, basename='idea')

urlpatterns = router.urls
