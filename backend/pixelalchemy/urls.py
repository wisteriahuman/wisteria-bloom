from django.urls import path
from .views import PNGToJPGView, JPGToPNGView, PNGToSVGView, JPGToSVGView

urlpatterns = [
    path('png-to-jpg/', PNGToJPGView.as_view(), name='png_to_jpg'),
    path('jpg-to-png/', JPGToPNGView.as_view(), name='jpg_to_png'),
    path('png-to-svg/', PNGToSVGView.as_view(), name='png_to_svg'),
    path('jpg-to-svg/', JPGToSVGView.as_view(), name='jpg_to_svg'),
]