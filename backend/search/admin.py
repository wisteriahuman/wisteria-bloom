from django.contrib import admin
from .models import Page


class PageAdmin(admin.ModelAdmin):
    list_display = ('title', 'path')
    list_filter = ('title', 'tags', 'path')
    search_fields = ('title', 'tags', 'description', 'path')

admin.site.register(Page, PageAdmin)