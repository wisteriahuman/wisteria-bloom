from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from .models import Page

class SearchAPITestCase(TestCase):
    def setUp(self):
        Page.objects.create(title="Test Page", tags="test, page",
                            description="これはテストページです", path="test-page")
        Page.objects.create(title="Another Test Page", tags="test, page",
                            description="これは別のテストページです", path="another-test-page")
        
        self.client = APIClient()
    
    def test_various_search_queries(self):
        test_cases = [
            {"query": "Test", "expected_count": 2},
            {"query": "テストページ", "expected_count": 2},
            {"query": "別の", "expected_count": 1},
            {"query": "invalid query", "expected_count": 0},
            {"query": "Another Page", "expected_count": 1}
        ]
        
        for case in test_cases:
            response = self.client.get(reverse('search'), {"q": case["query"]})
            self.assertEqual(response.status_code, 200)
            self.assertEqual(len(response.data), case["expected_count"])