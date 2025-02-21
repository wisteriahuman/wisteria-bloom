from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError
from random import randint
from .serializers import AtCoderRandomABCSerializer, AtCoderFixedDifficultyABCSerializer


ROWEST_CONTEST_ID = 212
HIGHEST_CONTEST_ID = 394

class AtCoderRandomABCView(APIView):
    def get(self, request):
        contest_id = randint(ROWEST_CONTEST_ID, HIGHEST_CONTEST_ID)
        problem_id = chr(randint(ord('a'), ord('g')))
        url = f"https://atcoder.jp/contests/abc{contest_id}/tasks/abc{contest_id}_{problem_id}"
        serializer = AtCoderRandomABCSerializer({"url": url})
        return Response(serializer.data)

class AtCoderFixedDifficultyABCView(APIView):
    def get(self, request, problem_id):
        if not (len(problem_id) == 1 and 'a' <= problem_id <= 'g'):
            raise ValidationError("Invalid problem_id")
        contest_id = randint(ROWEST_CONTEST_ID, HIGHEST_CONTEST_ID)
        url = f"https://atcoder.jp/contests/abc{contest_id}/tasks/abc{contest_id}_{problem_id}"
        serializer = AtCoderFixedDifficultyABCSerializer({"url": url})
        return Response(serializer.data)