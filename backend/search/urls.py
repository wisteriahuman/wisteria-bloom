from django.urls import path
from .views import AllPagesView, SearchQueryPagesView

urlpatterns = [
    path("", AllPagesView.as_view(), name="all_pages"),
    path("search/", SearchQueryPagesView.as_view(), name="search"),
]