from django.urls import path
from .views import PNGToJPEGView, JPEGToPNGView, PNGToSVGView, JPEGToSVGView

urlpatterns = [
    path('png-to-jpeg/', PNGToJPEGView.as_view(), name='png_to_jpg'),
    path('jpeg-to-png/', JPEGToPNGView.as_view(), name='jpg_to_png'),
    path('png-to-svg/', PNGToSVGView.as_view(), name='png_to_svg'),
    path('jpeg-to-svg/', JPEGToSVGView.as_view(), name='jpg_to_svg'),
]