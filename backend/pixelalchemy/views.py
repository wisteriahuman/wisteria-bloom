from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError
from PIL import Image
import base64
import io
import svgwrite
import cairosvg

class PNGToJPEGView(APIView):
    def post(self, request):
        image = Image.open(request.FILES["png"])
        if image.format != "PNG":
            raise ValidationError("Image is not in PNG format")
        image = image.convert("RGB")
        byte_io = io.BytesIO()
        image.save(byte_io, format="JPEG")
        res = base64.b64encode(byte_io.getvalue()).decode("ascii")
        return Response({"jpeg": res})

class JPEGToPNGView(APIView):
    def post(self, request):
        image = Image.open(request.FILES["jpeg"])
        if image.format != "JPEG":
            raise ValidationError("Image is not in JPEG format")
        image = image.convert("RGB")
        byte_io = io.BytesIO()
        image.save(byte_io, format="PNG")
        res = base64.b64encode(byte_io.getvalue()).decode("ascii")
        return Response({"png": res})

class PNGToSVGView(APIView):
    def post(self, request):
        image = Image.open(request.FILES["png"])
        if image.format != "PNG":
            raise ValidationError("Image is not in PNG format")
        in_byte_io = io.BytesIO()
        image.save(in_byte_io, format="PNG")
        img = base64.b64encode(in_byte_io.getvalue()).decode("ascii")
        width, height = image.size
        dwg = svgwrite.Drawing(size=(width, height))
        dwg.add(dwg.image(f"data:image/png;base64,{img}", insert=(0, 0), size=(width, height)))
        svg_content = dwg.tostring()
        xml_declaration = '<?xml version="1.0" encoding="utf-8" ?>\n'
        res = xml_declaration + svg_content
        return Response({"svg": res})

class JPEGToSVGView(APIView):
    def post(self, request):
        image = Image.open(request.FILES["jpeg"])
        if image.format != "JPEG":
            raise ValidationError("Image is not in JPEG format")
        in_byte_io = io.BytesIO()
        image.save(in_byte_io, format="JPEG")
        img = base64.b64encode(in_byte_io.getvalue()).decode("ascii")
        width, height = image.size
        dwg = svgwrite.Drawing(size=(width, height))
        dwg.add(dwg.image(f"data:image/jpeg;base64,{img}", insert=(0, 0), size=(width, height)))
        svg_content = dwg.tostring()
        xml_declaration = '<?xml version="1.0" encoding="utf-8" ?>\n'
        res = xml_declaration + svg_content
        return Response({"svg": res})

class SVGToPNGView(APIView):
    def post(self, request):
        svg_content = request.data["svg"]
        svg_content = svg_content.encode("utf-8")
        byte_io = io.BytesIO()
        cairosvg.svg2png(bytestring=svg_content, write_to=byte_io)
        res = base64.b64encode(byte_io.getvalue()).decode("ascii")
        return Response({"png": res})
