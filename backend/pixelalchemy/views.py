from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError
from PIL import Image
from fpdf import FPDF
import base64
import io
import svgwrite
import cairosvg
import tempfile
import os

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
        jpg_file = request.FILES["jpg"]
        jpg_bytes = jpg_file.read()
        jpg_io = io.BytesIO(jpg_bytes)
        jpg_image = Image.open(jpg_io)
        if jpg_image.format != "JPEG":
            raise ValidationError("Image is not in JPEG format")
        
        if hasattr(jpg_image, '_getexif') and jpg_image._getexif() is not None:
            exif = dict(jpg_image._getexif().items())
            orientation = exif.get(0x0112, 1)
            
            if orientation == 3:
                jpg_image = jpg_image.rotate(180, expand=True)
            elif orientation == 6:
                jpg_image = jpg_image.rotate(270, expand=True)
            elif orientation == 8:
                jpg_image = jpg_image.rotate(90, expand=True)
                
        width, height = jpg_image.size
        aspect_ratio = width / height
        
        pdf = FPDF()
        pdf.add_page()
        page_width = 210
        page_height = 297
        
        if aspect_ratio > 1:
            w = page_width
            h = page_width / aspect_ratio
        else:
            h = page_height
            w = page_height * aspect_ratio
        x = (page_width - w) / 2
        y = (page_height - h) / 2
        
        with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp_file:
            temp_file.write(jpg_bytes)
            temp_file_path = temp_file.name

        pdf.image(temp_file_path, x=x, y=y, w=w, h=h)
        os.unlink(temp_file_path)
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_pdf_file:
            pdf_path = temp_pdf_file.name
        pdf.output(pdf_path)
        with open(pdf_path, "rb") as f:
            pdf_bytes = f.read()
        os.unlink(pdf_path)
        
        res = base64.b64encode(pdf_bytes).decode("ascii")
        return Response({"pdf": res})

class PNGToPDFView(APIView):
    def post(self, request):
        png_file = request.FILES["png"]
        png_bytes = png_file.read()
        png_io = io.BytesIO(png_bytes)
        png_image = Image.open(png_io)
        if png_image.format != "PNG":
            raise ValidationError("Image is not in PNG format")
        
        if hasattr(png_image, '_getexif') and png_image._getexif() is not None:
            exif = dict(png_image._getexif().items())
            orientation = exif.get(0x0112, 1)
            
            if orientation == 3:
                png_image = png_image.rotate(180, expand=True)
            elif orientation == 6:
                png_image = png_image.rotate(270, expand=True)
            elif orientation == 8:
                png_image = png_image.rotate(90, expand=True)
                
        width, height = png_image.size
        aspect_ratio = width / height
        
        pdf = FPDF()
        pdf.add_page()
        page_width = 210
        page_height = 297
        
        if aspect_ratio > 1:
            w = page_width
            h = page_width / aspect_ratio
        else:
            h = page_height
            w = page_height * aspect_ratio
        x = (page_width - w) / 2
        y = (page_height - h) / 2
        
        with tempfile.NamedTemporaryFile(delete=False, suffix=".png") as temp_file:
            temp_file.write(png_bytes)
            temp_file_path = temp_file.name

        pdf.image(temp_file_path, x=x, y=y, w=w, h=h)
        os.unlink(temp_file_path)
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_pdf_file:
            pdf_path = temp_pdf_file.name
        pdf.output(pdf_path)
        with open(pdf_path, "rb") as f:
            pdf_bytes = f.read()
        os.unlink(pdf_path)
        
        res = base64.b64encode(pdf_bytes).decode("ascii")
        return Response({"pdf": res})