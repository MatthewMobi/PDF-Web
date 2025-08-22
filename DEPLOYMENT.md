# Deployment Guide

This guide explains how to deploy the PDF Web Viewer frontend and integrate it with your backend.

## 🚀 **How Your Backend Knows About the Frontend**

### **1. API-First Architecture (Current Setup)**

The frontend and backend communicate through **REST APIs**. Your backend doesn't need to "know" about the frontend - it just needs to:

1. **Expose API endpoints** that the frontend can call
2. **Handle CORS** to allow frontend requests
3. **Return data** in the expected format

### **2. Deployment Options**

#### **Option A: Separate Deployment (Recommended)**
```
Frontend: https://your-frontend.com (React app)
Backend:  https://your-backend.com (API server)
```

#### **Option B: Combined Deployment**
```
Single Server: https://your-app.com
├── /api/* (Backend routes)
└── /* (Frontend routes)
```

## 📋 **Backend Requirements**

Your backend needs to implement these endpoints:

### **Required API Endpoints:**

1. **`POST /api/documents/upload`** - Upload and process PDFs
2. **`POST /api/questions/ask`** - AI question answering
3. **`GET /api/documents/{id}`** - Get document details
4. **`GET /api/documents/{id}/highlights`** - Get document highlights

### **CORS Configuration:**
```python
# Python/Flask
from flask_cors import CORS
CORS(app, origins=["https://your-frontend.com"])

# Node.js/Express
app.use(cors({
  origin: 'https://your-frontend.com'
}));
```

## 🔧 **Frontend Configuration**

### **Environment Variables:**
```bash
# .env.production
REACT_APP_API_URL=https://your-backend.com/api
```

### **Build the Frontend:**
```bash
npm run build
```

## 🌐 **Deployment Steps**

### **Step 1: Deploy Your Backend**

#### **Python/Flask Example:**
```python
# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["https://your-frontend.com"])

@app.route('/api/documents/upload', methods=['POST'])
def upload_pdf():
    # Your PDF processing logic
    return jsonify({
        "documentId": "doc_123",
        "name": "document.pdf",
        "url": "https://your-backend.com/storage/doc_123.pdf",
        "numPages": 5,
        "highlights": [...]
    })

@app.route('/api/questions/ask', methods=['POST'])
def ask_question():
    # Your AI processing logic
    return jsonify({
        "answer": "AI response here",
        "highlights": [...]
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
```

#### **Deploy to:**
- **Heroku**: `git push heroku main`
- **AWS**: Use Elastic Beanstalk or EC2
- **DigitalOcean**: Use App Platform or Droplets
- **Railway**: Connect your GitHub repo

### **Step 2: Deploy the Frontend**

#### **Build and Deploy:**
```bash
# Build the production version
npm run build

# Deploy to your hosting service
```

#### **Deploy to:**
- **Netlify**: Drag `build/` folder or connect GitHub
- **Vercel**: `vercel --prod`
- **GitHub Pages**: `npm run deploy`
- **AWS S3**: Upload `build/` contents

### **Step 3: Configure Environment**

Set the production API URL:
```bash
# Netlify environment variables
REACT_APP_API_URL=https://your-backend.com/api

# Vercel environment variables
REACT_APP_API_URL=https://your-backend.com/api
```

## 🔗 **Integration Testing**

### **Test the Connection:**
1. Deploy your backend first
2. Test API endpoints with Postman/curl
3. Deploy frontend with correct API URL
4. Test full workflow: upload PDF → ask questions

### **Common Issues:**
- **CORS errors**: Check backend CORS configuration
- **404 errors**: Verify API endpoint paths
- **Network errors**: Check API URL configuration

## 📱 **Production Considerations**

### **Security:**
- Add authentication (JWT, OAuth)
- Validate file uploads
- Rate limiting
- HTTPS only

### **Performance:**
- CDN for static assets
- API caching
- Database optimization
- Load balancing

### **Monitoring:**
- API health checks
- Error logging
- Performance metrics
- User analytics

## 🎯 **Quick Start Example**

### **1. Simple Backend (Python/Flask):**
```python
pip install flask flask-cors
python app.py
```

### **2. Deploy Frontend:**
```bash
# Set API URL
echo "REACT_APP_API_URL=http://localhost:8000/api" > .env

# Build and serve locally
npm run build
npx serve -s build
```

### **3. Test Integration:**
- Open frontend at `http://localhost:3000`
- Upload a PDF
- Ask questions
- Verify highlights appear

## 🔄 **Development Workflow**

1. **Local Development:**
   ```bash
   # Terminal 1: Backend
   python app.py
   
   # Terminal 2: Frontend
   npm start
   ```

2. **Testing:**
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:8000`

3. **Production:**
   - Deploy backend first
   - Update frontend API URL
   - Deploy frontend
   - Test integration

## 📞 **Support**

If you need help with:
- **Backend implementation**: Check `BACKEND_API.md`
- **Frontend issues**: Check the React console
- **Deployment problems**: Check hosting service logs
- **Integration issues**: Verify API responses

The key is that your backend just needs to **expose the right APIs** - the frontend will handle the rest!
