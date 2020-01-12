from rest_framework import serializers

from .models import Country, Company, Client


class CountryOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ['id', 'name', 'city']


class ClientOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['id', 'first_name', 'last_name']


class CompanyListSerializer(serializers.ModelSerializer):
    country_name = serializers.SerializerMethodField()

    class Meta:
        model = Company
        fields = ['id', 'name', 'industry', 'country_name']

    def get_country_name(self, obj):
        return obj.country.name if obj.country else ''


class CountryListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Country
        fields = ['id', 'name', 'city']


class CompanyFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'


class CountryFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'


