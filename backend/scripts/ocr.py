import cv2
import pytesseract
import sys
import json
import numpy as np
import time
try:
    import fitz # PyMuPDF
    PYMUPDF_AVAILABLE = True
except ImportError:
    PYMUPDF_AVAILABLE = False

def preprocess_image(image_path):
    stats = {}
    
    start_time = time.time()
    
    if image_path.lower().endswith(".pdf"):
        if not PYMUPDF_AVAILABLE:
            return None, {"error": "PyMuPDF not installed"}
        try:
            doc = fitz.open(image_path)
            page = doc.load_page(0)
            pix = page.get_pixmap(matrix=fitz.Matrix(2, 2)) # upscale 2x during conversion
            img_data = pix.tobytes("png")
            nparr = np.frombuffer(img_data, np.uint8)
            img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            doc.close()
        except Exception as e:
            return None, {"error": str(e)}
    else:
        img = cv2.imread(image_path)

    if img is None:
        return None, stats
    
    stats["load_time"] = time.time() - start_time
    
    height, width = img.shape[:2]
    max_dim = 1500
    if max(height, width) > max_dim:
        scale = max_dim / float(max(height, width))
        img = cv2.resize(img, (int(width * scale), int(height * scale)), interpolation=cv2.INTER_AREA)
        stats["resize_down_time"] = time.time() - (start_time + stats["load_time"])
    else:
        img = cv2.resize(img, (width * 2, height * 2), interpolation=cv2.INTER_CUBIC)
        stats["resize_up_time"] = time.time() - (start_time + stats["load_time"])
    start_gray = time.time()
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    stats["gray_time"] = time.time() - start_gray

    start_denoise = time.time()
    denoised = cv2.fastNlMeansDenoising(gray, h=7, templateWindowSize=7, searchWindowSize=21)
    stats["denoise_time"] = time.time() - start_denoise
    start_thresh = time.time()
    _, thresh = cv2.threshold(denoised, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    stats["thresh_time"] = time.time() - start_thresh

    return thresh, stats

image_path = sys.argv[1]
processed_img, proc_stats = preprocess_image(image_path)

start_ocr = time.time()
if processed_img is not None:
    text = pytesseract.image_to_string(
        processed_img,
        lang="ara+eng+fra",
        config='--psm 3'
    )
else:
    text = ""
proc_stats["ocr_time"] = time.time() - start_ocr

result = {
    "text": text,
    "debug": proc_stats
}

print(json.dumps(result))
