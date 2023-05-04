from rest_framework import serializers
from apps.contractors.models import Priority


class PrioritySerializer(serializers.ModelSerializer):

    class Meta:
        model = Priority
        fields = '__all__'