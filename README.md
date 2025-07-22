# grader_coderdocs

## About TrOCR

TrOCR (Transformer-based Optical Character Recognition) is a deep learning model developed by Microsoft for extracting text from images, especially handwritten or printed documents. This project uses the TrOCR model to recognize and extract mathematical expressions from images via a Flask backend.

## Getting Started

Follow these steps to set up and run the project after cloning:

### 1. Clone the repository
```bash
git clone git@github.com:TwilightTechie/grader_coderdocs.git
cd grader_coderdocs
```

### 2. Setup and Run the Backend (Flask + TrOCR)
```bash
cd server
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```
- The backend will start at http://localhost:5000

### 3. Setup and Run the Frontend (React)
```bash
cd ../client
npm install
npm start
```
- The frontend will start at http://localhost:3000

## Notes
- Make sure you have Python 3 and Node.js installed.
- The backend uses the TrOCR model from HuggingFace Transformers.
- Large files and virtual environments are excluded from version control via `.gitignore`.