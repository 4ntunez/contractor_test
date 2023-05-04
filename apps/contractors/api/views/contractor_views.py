from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from apps.contractors.api.serializers.contractor_serializers import ContractorSerializer
from apps.contractors.models import Contractor

class ContractorViewSet(viewsets.ModelViewSet):
    serializer_class = ContractorSerializer
    queryset = ContractorSerializer.Meta.model.objects.all()
    permission_classes = [permissions.AllowAny]
