from django.conf.urls import url
from django.contrib import admin
from django.urls import path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework_jwt.views import obtain_jwt_token

from . import views

schema_view = get_schema_view(
    openapi.Info(
        title='API',
        default_version='v1'
    ),
)

urlpatterns = [
    url(r'^api-token-auth/', obtain_jwt_token),
    path('admin/', admin.site.urls),
    path('country/options', views.country_option_list),
    path('client/options', views.client_option_list),
    path('company/list', views.companies_list),
    path('country/list', views.countries_list),
    path('company/create', views.company_form_create),
    path('country/create', views.country_form_create),
    path('company/<int:pk>/get', views.company_form_get),
    path('country/<int:pk>/get', views.country_form_get),
    path('company/<int:pk>/update', views.company_form_update),
    path('country/<int:pk>/update', views.country_form_update),
    path('company/<int:pk>/delete', views.company_delete),
    path('country/<int:pk>/delete', views.country_delete),

    url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
