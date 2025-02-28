from django.urls import path
from .views import PNGToJPGView, JPGToPNGView, PNGToSVGView, JPGToSVGView, SVGToPNGView, SVGToJPGView, JPGToPDFView, PNGToPDFView

urlpatterns = [
    path('png-to-jpg/', PNGToJPGView.as_view(), name='png_to_jpg'),
    path('jpg-to-png/', JPGToPNGView.as_view(), name='jpg_to_png'),
    path('png-to-svg/', PNGToSVGView.as_view(), name='png_to_svg'),
    path('jpg-to-svg/', JPGToSVGView.as_view(), name='jpg_to_svg'),
    path('svg-to-png/', SVGToPNGView.as_view(), name='svg_to_png'),
    path('svg-to-jpg/', SVGToJPGView.as_view(), name='svg_to_jpg'),
    path('jpg-to-pdf/', JPGToPDFView.as_view(), name='jpg_to_pdf'),
    path('png-to-pdf/', PNGToPDFView.as_view(), name='png_to_pdf'),
]