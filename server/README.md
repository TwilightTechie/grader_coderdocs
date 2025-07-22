# TrOCR Flask Backend

## Setup

1. Create and activate a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Run the server

```bash
python app.py
```

The server will start on http://localhost:5000

## API

- **POST** `/upload` (multipart/form-data)
  - `file`: image file (.jpg/.png)
  - **Response:** `{ "text": "Extracted content..." }` or `{ "error": "..." }` 