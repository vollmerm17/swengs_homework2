from django.contrib.auth.decorators import permission_required
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.response import Response

from yamod.models import Country, Company, Client
from yamod.serializers import CountryOptionSerializer, CompanyListSerializer, CompanyFormSerializer, \
    ClientOptionSerializer, CountryFormSerializer, CountryListSerializer


@swagger_auto_schema(method='GET', responses={200: CountryOptionSerializer(many=True)})
@api_view(['GET'])
def country_option_list(request):
    countries = Country.objects.all()
    serializer = CountryOptionSerializer(countries, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='GET', responses={200: ClientOptionSerializer(many=True)})
@api_view(['GET'])
def client_option_list(request):
    clients = Client.objects.all()
    serializer = ClientOptionSerializer(clients, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='GET', responses={200: CompanyListSerializer(many=True)})
@api_view(['GET'])
@permission_required('yamod.view_company', raise_exception=True)
def companies_list(request):
    countries = Company.objects.all()
    serializer = CompanyListSerializer(countries, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='GET', responses={200: CountryListSerializer(many=True)})
@api_view(['GET'])
@permission_required('yamod.view_country', raise_exception=True)
def countries_list(request):
    countries = Country.objects.all()
    serializer = CountryListSerializer(countries, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='POST', request_body=CountryFormSerializer, responses={200: CountryFormSerializer()})
@api_view(['POST'])
@permission_required('yamod.add_country', raise_exception=True)
def country_form_create(request):
    data = JSONParser().parse(request)
    serializer = CountryFormSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='PUT', request_body=CountryFormSerializer, responses={200: CountryFormSerializer()})
@api_view(['PUT'])
@permission_required('yamod.change_country', raise_exception=True)
def country_form_update(request, pk):
    try:
        country = Country.objects.get(pk=pk)
    except Country.DoesNotExist:
        return Response({'error': 'Country does not exist.'}, status=404)
    data = JSONParser().parse(request)
    serializer = CountryFormSerializer(country, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='GET', responses={200: CountryFormSerializer()})
@api_view(['GET'])
@permission_required('yamod.view_country', raise_exception=True)
def country_form_get(request, pk):
    try:
        country = Country.objects.get(pk=pk)
    except Country.DoesNotExist:
        return Response({'error': 'Country does not exist.'}, status=404)

    serializer = CountryFormSerializer(country)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_required('yamod.delete_country', raise_exception=True)
def country_delete(request, pk):
    try:
        country = Country.objects.get(pk=pk)
    except Country.DoesNotExist:
        return Response({'error': 'Country does not exist.'}, status=404)
    country.delete()
    return Response(status=204)


@swagger_auto_schema(method='POST', request_body=CompanyFormSerializer, responses={200: CompanyFormSerializer()})
@api_view(['POST'])
@permission_required('yamod.add_company', raise_exception=True)
def company_form_create(request):
    data = JSONParser().parse(request)
    serializer = CompanyFormSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='PUT', request_body=CompanyFormSerializer, responses={200: CompanyFormSerializer()})
@api_view(['PUT'])
@permission_required('yamod.change_company', raise_exception=True)
def company_form_update(request, pk):
    try:
        company = Company.objects.get(pk=pk)
    except Company.DoesNotExist:
        return Response({'error': 'Company does not exist.'}, status=404)

    data = JSONParser().parse(request)
    serializer = CompanyFormSerializer(company, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='GET', responses={200: CompanyFormSerializer()})
@api_view(['GET'])
@permission_required('yamod.view_company', raise_exception=True)
def company_form_get(request, pk):
    try:
        company = Company.objects.get(pk=pk)
    except Company.DoesNotExist:
        return Response({'error': 'Company does not exist.'}, status=404)

    serializer = CompanyFormSerializer(company)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_required('yamod.delete_company', raise_exception=True)
def company_delete(request, pk):
    try:
        company = Company.objects.get(pk=pk)
    except Country.DoesNotExist:
        return Response({'error': 'Company does not exist.'}, status=404)
    company.delete()
    return Response(status=204)
