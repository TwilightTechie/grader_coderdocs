from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import TrOCRProcessor, VisionEncoderDecoderModel
from PIL import Image
import torch
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

processor = TrOCRProcessor.from_pretrained("fhswf/TrOCR_Math_handwritten")
model = VisionEncoderDecoderModel.from_pretrained("fhswf/TrOCR_Math_handwritten")
device = torch.device("cpu")
model.to(device)

def predict_text(image_path):
    image = Image.open(image_path).convert("RGB")
    pixel_values = processor(images=image, return_tensors="pt").pixel_values.to(device)
    generated_ids = model.generate(pixel_values, max_new_tokens=100)
    return processor.batch_decode(generated_ids, skip_special_tokens=True)[0]

@app.route("/upload", methods=["POST"])
def upload():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request."}), 400
    file = request.files["file"]
    if file.filename == '':
        return jsonify({"error": "No selected file."}), 400
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)
    try:
        result = predict_text(file_path)
        return jsonify({"text": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True) 