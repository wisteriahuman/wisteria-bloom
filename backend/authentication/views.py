from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from google.oauth2 import id_token
from google.auth.transport import requests
import os

User = get_user_model()

@api_view(['POST'])
@permission_classes([AllowAny])
def google_login(request):
    try:
        print("リクエスト受信:", request.data)
        google_token = request.data.get('token')
        if not google_token:
            print("トークンが見つかりません")
            return Response({'error': 'トークンが見つかりません'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user_info = verify_google_token(google_token)
            print("トークン検証成功:", user_info)
            user, created = User.objects.get_or_create(
                email=user_info['email'],
                defaults={
                    'username': user_info['email'],
                    'first_name': user_info.get('given_name', ''),
                    'last_name': user_info.get('family_name', ''),
                }
            )
            
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'name': f"{user.first_name} {user.last_name}".strip(),
                }
            })
        except Exception as e:
            print("トークン検証エラー:", str(e))
            return Response({'error': f"トークン検証エラー: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print("予期せぬエラー:", str(e))
        return Response({'error': f"サーバーエラー: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
def verify_google_token(token):
    try:
        idinfo = id_token.verify_oauth2_token(
            token,
            requests.Request(),
            audience=os.environ.get('GOOGLE_CLIENT_ID')
        )
        
        if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            raise ValueError('不正な発行者です')
        
        return idinfo
    except Exception as e:
        print(f"詳細なエラー情報: {e.__class__.__name__}: {str(e)}")
        raise ValueError(f"無効なトークン: {str(e)}")