from transformers import TrOCRProcessor, VisionEncoderDecoderModel
from PIL import Image
import requests
import torch

# Load processor and model
processor = TrOCRProcessor.from_pretrained("fhswf/TrOCR_Math_handwritten")
model = VisionEncoderDecoderModel.from_pretrained("fhswf/TrOCR_Math_handwritten")

# Make sure model runs on CPU
device = torch.device("cpu")
model.to(device)

# Load an image (can also use local path: Image.open("path.jpg"))
image_url = "/home/hardway/coderdocs/grader/Own_TrOCR/maths1.jpg"
image = Image.open(image_url).convert("RGB")

# Preprocess and infer
pixel_values = processor(images=image, return_tensors="pt").pixel_values.to(device)
generated_ids = model.generate(pixel_values, max_new_tokens=100)
# Decode the result
generated_text = processor.batch_decode(generated_ids, skip_special_tokens=True)[0]
print("Predicted text:", generated_text)
