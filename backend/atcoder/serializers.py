from rest_framework import serializers

class AtCoderRandomABCSerializer(serializers.Serializer):
    url = serializers.URLField()

class AtCoderFixedDifficultyABCSerializer(serializers.Serializer):
    url = serializers.URLField()