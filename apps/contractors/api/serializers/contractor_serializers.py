from rest_framework import serializers
from apps.contractors.models import Contractor


class ContractorSerializer(serializers.ModelSerializer):
    # priority = serializers.StringRelatedField()

    class Meta:
        model = Contractor
        fields = "__all__"
        # fields = ("id", "name", "company", "priority", "country", "phone_number", "email")