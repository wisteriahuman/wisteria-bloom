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
        query = request.query_params.get("q", "").strip().split()
        q_objects = Q()
        for term in query:
            q_objects &= (
                Q(title__icontains=term) |
                Q(tags__icontains=term) |
                Q(description__icontains=term)
            )
        pages = Page.objects.filter(q_objects)
        serializer = PageSerializer(pages, many=True)
        return Response(serializer.data)