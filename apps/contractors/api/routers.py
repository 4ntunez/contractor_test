from rest_framework.routers import DefaultRouter
from apps.contractors.api.views.contractor_views import ContractorViewSet
from apps.contractors.api.views.priority_views import PriorityViewSet


router = DefaultRouter()
router.register(r'contractor', ContractorViewSet)
router.register(r'priority', PriorityViewSet)

urlpatterns = router.urls