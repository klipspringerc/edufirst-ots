from rest_framework import serializers
from users.models import Account


class AccountSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='get_username')
    class Meta:
        model = Account
        fields = ('username', 'certificate')