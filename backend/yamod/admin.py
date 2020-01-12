from django.contrib import admin
from .models import *


class CompanyAdmin(admin.ModelAdmin):
    list_filter = ('customers__last_name', )


class ClientAdmin(admin.ModelAdmin): pass


class CountryAdmin(admin.ModelAdmin): pass


admin.site.register(Company, CompanyAdmin)
admin.site.register(Client, ClientAdmin)
admin.site.register(Country, CountryAdmin)
