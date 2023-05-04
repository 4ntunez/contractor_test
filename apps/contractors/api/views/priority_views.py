from rest_framework import viewsets, permissions

from apps.contractors.api.serializers.priority_serializers import PrioritySerializer

class PriorityViewSet(viewsets.ModelViewSet):
    serializer_class = PrioritySerializer
    queryset = PrioritySerializer.Meta.model.objects.all()
    permission_classes = [permissions.AllowAny]
    
