import cv2
import pytesseract
import sys
import json

image_path = sys.argv[1]

img = cv2.imread(image_path)

gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
blur = cv2.GaussianBlur(gray, (5,5), 0)

text = pytesseract.image_to_string(
    blur,
    lang="ara+eng+fra"
)

result = {
    "text": text
}

print(json.dumps(result))
