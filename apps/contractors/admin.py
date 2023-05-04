from django.contrib import admin

from apps.contractors.models import Company, Priority, Contractor

# Register your models here.
admin.site.register(Company)
admin.site.register(Priority)
admin.site.register(Contractor)

