# Backend API Specification

This document outlines the API endpoints that your backend needs to implement to work with the PDF Web Viewer frontend.

## Base URL
```
http://localhost:8000/api/v1
```

## Authentication
Currently, the frontend doesn't implement authentication. You can add JWT tokens or session-based auth as needed.

## API Endpoints

### 1. Upload PDF Document

**Endpoint:** `POST /api/v1/documents/upload`

**Description:** Upload a PDF file and process it to extract highlights and text.

**Request:**
- Content-Type: `multipart/form-data`
- Body: PDF file with field name `pdf`

**Response:**
```json
{
  "documentId": "doc_123456",
  "name": "sample.pdf",
  "url": "http://localhost:8000/storage/documents/doc_123456.pdf",
  "numPages": 5,
  "highlights": [
    {
      "id": "highlight_1",
      "page": 1,
      "x": 100.5,
      "y": 200.3,
      "width": 150.0,
      "height": 20.0,
      "text": "This is an important concept",
      "color": "rgba(255, 255, 0, 0.3)"
    },
    {
      "id": "highlight_2",
      "page": 1,
      "x": 300.0,
      "y": 300.0,
      "width": 200.0,
      "height": 25.0,
      "text": "Another key point to remember",
      "color": "rgba(0, 255, 0, 0.3)"
    }
  ]
}
```

**Backend Processing Required:**
1. Save the uploaded PDF file
2. Extract text and coordinates from the PDF
3. Identify important sections (for highlights)
4. Return document metadata with highlights

### 2. Ask Question

**Endpoint:** `POST /api/v1/questions/ask`

**Description:** Ask an AI question about a specific document.

**Request:**
```json
{
  "documentId": "doc_123456",
  "question": "What are the main points discussed in this document?",
  "highlightIds": ["highlight_1", "highlight_2"]
}
```

**Response:**
```json
{
  "answer": "Based on the document content, the main points discussed include...",
  "highlights": [
    {
      "id": "highlight_3",
      "page": 2,
      "x": 150.0,
      "y": 250.0,
      "width": 180.0,
      "height": 22.0,
      "text": "This text supports the answer"
    }
  ]
}
```

**Backend Processing Required:**
1. Retrieve the document content
2. Process the question with your AI model
3. Generate relevant highlights that support the answer
4. Return the answer with supporting text references

### 3. Get Document Details

**Endpoint:** `GET /api/v1/documents/{documentId}`

**Description:** Retrieve document metadata and highlights.

**Response:** Same as upload response

### 4. Get Document Highlights

**Endpoint:** `GET /api/v1/documents/{documentId}/highlights`

**Description:** Retrieve only the highlights for a document.

**Response:**
```json
[
  {
    "id": "highlight_1",
    "page": 1,
    "x": 100.5,
    "y": 200.3,
    "width": 150.0,
    "height": 20.0,
    "text": "This is an important concept",
    "color": "rgba(255, 255, 0, 0.3)"
  }
]
```

## Coordinate System

The frontend expects PDF coordinates in the following format:
- **Origin**: Top-left corner of the page
- **Units**: Points (1/72 inch)
- **X-axis**: Left to right
- **Y-axis**: Top to bottom

## Error Handling

All endpoints should return appropriate HTTP status codes:

- `200`: Success
- `400`: Bad Request (invalid input)
- `404`: Not Found (document not found)
- `500`: Internal Server Error

Error responses should include:
```json
{
  "error": "Error message description",
  "code": "ERROR_CODE"
}
```

## CORS Configuration

Your backend needs to allow CORS from the frontend:

```python
# Python/Flask example
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

# Node.js/Express example
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000'
}));
```

## Environment Variables

The frontend uses these environment variables:

```bash
REACT_APP_API_URL=http://localhost:8000/api/v1

## Implementation Examples

### Python/Flask Backend
```python
from flask import Flask, request, jsonify
from flask_cors import CORS
import fitz  # PyMuPDF
import os

app = Flask(__name__)
CORS(app)

@app.route('/api/documents/upload', methods=['POST'])
def upload_pdf():
    if 'pdf' not in request.files:
        return jsonify({'error': 'No PDF file'}), 400
    
    file = request.files['pdf']
    # Process PDF and extract highlights
    # Return response as specified above

@app.route('/api/questions/ask', methods=['POST'])
def ask_question():
    data = request.json
    # Process question with AI model
    # Return response as specified above
```

### Node.js/Express Backend
```javascript
const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

app.post('/api/documents/upload', upload.single('pdf'), (req, res) => {
    // Process PDF and extract highlights
    // Return response as specified above
});

app.post('/api/questions/ask', (req, res) => {
    // Process question with AI model
    // Return response as specified above
});
```

## Testing the Integration

1. Start your backend server on port 8000
2. Set the environment variable: `REACT_APP_API_URL=http://localhost:8000/api`
3. Start the frontend: `npm start`
4. Upload a PDF and test the question-answering functionality

## Next Steps

1. Implement the required API endpoints in your backend
2. Add proper error handling and validation
3. Integrate with your AI model for question answering
4. Add authentication if needed
5. Deploy both frontend and backend to production
