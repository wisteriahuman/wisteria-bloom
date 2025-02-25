from django.db import models


class Page(models.Model):
    title = models.CharField(max_length=200, verbose_name="Title")
    tags = models.TextField(blank=True, null=True, verbose_name="Tags")
    description = models.TextField(blank=True, null=True, verbose_name="Description")
    path = models.CharField(max_length=200, verbose_name="Path")
    
    def __str__(self):
        return self.title