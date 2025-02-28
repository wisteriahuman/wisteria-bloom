from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError
from PIL import Image
from fpdf import FPDF
import base64
import io
import svgwrite
import cairosvg

class PNGToJPGView(APIView):
    def post(self, request):
        image = Image.open(request.FILES["png"])
        if image.format != "PNG":
            raise ValidationError("Image is not in PNG format")
        image = image.convert("RGB")
        byte_io = io.BytesIO()
        image.save(byte_io, format="JPEG")
        res = base64.b64encode(byte_io.getvalue()).decode("ascii")
        return Response({"jpg": res})

class JPGToPNGView(APIView):
    def post(self, request):
        image = Image.open(request.FILES["jpg"])
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

class JPGToSVGView(APIView):
    def post(self, request):
        image = Image.open(request.FILES["jpg"])
        if image.format != "JPEG":
            raise ValidationError("Image is not in JPEG format")
        in_byte_io = io.BytesIO()
        image.save(in_byte_io, format="JPEG")
        img = base64.b64encode(in_byte_io.getvalue()).decode("ascii")
        width, height = image.size
        dwg = svgwrite.Drawing(size=(width, height))
        dwg.add(dwg.image(f"data:image/jpg;base64,{img}", insert=(0, 0), size=(width, height)))
        svg_content = dwg.tostring()
        xml_declaration = '<?xml version="1.0" encoding="utf-8" ?>\n'
        res = xml_declaration + svg_content
        return Response({"svg": res})

class SVGToPNGView(APIView):
    def post(self, request):
        try:
            svg_file = request.FILES["svg"]
            svg_content = svg_file.read()
            
            if not svg_content.startswith(b'<?xml') and not svg_content.startswith(b'<svg'):
                raise ValidationError("Image is not in SVG format")
            
            byte_io = io.BytesIO()
            cairosvg.svg2png(bytestring=svg_content, write_to=byte_io)
            res = base64.b64encode(byte_io.getvalue()).decode("ascii")
            return Response({"png": res})
        except Exception as e:
            raise ValidationError(f"SVG to PNG conversion failed: {e}")

class SVGToJPGView(APIView):
    def post(self, request):
        try:
            svg_file = request.FILES["svg"]
            svg_content = svg_file.read()
            
            if not svg_content.startswith(b'<?xml') and not svg_content.startswith(b'<svg'):
                raise ValidationError("Image is not in SVG format")
            
            byte_io = io.BytesIO()
            cairosvg.svg2png(bytestring=svg_content, write_to=byte_io)
            image = Image.open(byte_io)
            byte_io = io.BytesIO()
            image.save(byte_io, format="JPEG")
            res = base64.b64encode(byte_io.getvalue()).decode("ascii")
            return Response({"jpg": res})
        except Exception as e:
            raise ValidationError(f"SVG to JPG conversion failed: {e}")

class JPGToPDFView(APIView):
    def post(self, request):
        jpg_content = Image.open(request.FILES["jpg"])
        if jpg_content.format != "JPEG":
            raise ValidationError("Image is not in JPEG format")
        width, height = jpg_content.size
        aspect_ratio = width / height
        pdf = FPDF()
        pdf.add_page()
        page_width = 170
        page_height = 257
        
        if aspect_ratio > 1:
            w = page_width
            h = page_width / aspect_ratio
        else:
            h = page_height
            w = page_height * aspect_ratio
        x = (page_width - w) / 2
        y = (page_height - h) / 2
        pdf.image(jpg_content, x=x, y=y, w=w, h=h)
        byte_io = io.BytesIO()
        pdf.output(byte_io)
        res = base64.b64encode(byte_io.getvalue()).decode("ascii")
        return Response({"pdf": res})

class PNGToPDFView(APIView):
    def post(self, request):
        png_content = Image.open(request.FILES["png"])
        if png_content.format != "PNG":
            raise ValidationError("Image is not in PNG format")
        width, height = png_content.size
        aspect_ratio = width / height
        pdf = FPDF()
        pdf.add_page()
        page_width = 170
        page_height = 257
        
        if aspect_ratio > 1:
            w = page_width
            h = page_width / aspect_ratio
        else:
            h = page_height
            w = page_height * aspect_ratio
        x = (page_width - w) / 2
        y = (page_height - h) / 2
        pdf.image(png_content, x=x, y=y, w=w, h=h)
        byte_io = io.BytesIO()
        pdf.output(byte_io)
        res = base64.b64encode(byte_io.getvalue()).decode("ascii")
        return Response({"pdf": res})