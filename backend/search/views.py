from django.db.models import Q
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import PageSerializer
from .models import Page

class AllPagesView(APIView):
    def get(self, request):
        pages = Page.objects.all()
        serializer = PageSerializer(pages, many=True)
        return Response(serializer.data)

class SearchQueryPagesView(APIView):
    def get(self, request):
        query = request.query_params.get("q").strip()
        pages = Page.objects.filter(
            Q(title__icontains=query) | Q(tags__icontains=query) | Q(description__icontains=query)
        )
        serializer = PageSerializer(pages, many=True)
        return Response(serializer.data)