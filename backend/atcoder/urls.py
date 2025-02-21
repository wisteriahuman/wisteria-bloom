from django.urls import path
from .views import AtCoderRandomABCView, AtCoderFixedDifficultyABCView

urlpatterns = [
    path('', AtCoderRandomABCView.as_view(), name='atcoder_random_abc'),
    path('<str:problem_id>/', AtCoderFixedDifficultyABCView.as_view(), name='atcoder_fixed_difficulty_abc'),
]