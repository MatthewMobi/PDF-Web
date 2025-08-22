# 🧪 Integration Test Guide

## ✅ **Current Status**

### **Backend Status:**
- ✅ **Health Check**: `http://localhost:8000/health` - Working
- ✅ **API Endpoints**: `/api/v1/*` - Available
- ✅ **CORS**: Configured for frontend
- ✅ **Response Format**: `{ success: boolean, data: any }`

### **Frontend Status:**
- ✅ **React App**: Running on `http://localhost:3000`
- ✅ **API Service**: Updated to use `/api/v1/`
- ✅ **Response Handling**: Updated for backend format
- ✅ **Components**: All built and ready

## 🚀 **Ready to Test!**

### **Step 1: Verify Backend is Running**
```bash
curl http://localhost:8000/health
# Expected: {"service":"pdf-core-backend","status":"healthy"}
```

### **Step 2: Test Frontend-Backend Connection**

1. **Open your browser** to `http://localhost:3000`
2. **Upload a PDF file** using the drag & drop interface
3. **Check browser console** for API calls
4. **Verify PDF displays** with highlights
5. **Ask a question** in the Q&A panel

### **Step 3: Expected API Calls**

When you upload a PDF, the frontend will call:
```
POST http://localhost:8000/api/v1/documents/upload
```

When you ask a question, the frontend will call:
```
POST http://localhost:8000/api/v1/questions/ask
```

## 🔧 **Troubleshooting**

### **If Upload Fails:**
- Check browser console for errors
- Verify backend is running on port 8000
- Check CORS configuration in backend

### **If Questions Don't Work:**
- Check network tab for API calls
- Verify response format matches expectations
- Check backend logs for errors

### **If Highlights Don't Show:**
- Verify PDF file is valid
- Check coordinate format in backend response
- Ensure PDF URL is accessible

## 📊 **API Response Format**

### **Upload Response (Expected):**
```json
{
  "success": true,
  "data": {
    "documentId": "uuid",
    "name": "document.pdf",
    "url": "/uploads/uuid.pdf",
    "numPages": 5,
    "highlights": [
      {
        "id": "highlight_1",
        "page": 1,
        "x": 100.5,
        "y": 200.3,
        "width": 150.0,
        "height": 20.0,
        "text": "Important text",
        "color": "rgba(255, 255, 0, 0.3)"
      }
    ]
  }
}
```

### **Question Response (Expected):**
```json
{
  "success": true,
  "data": {
    "answer": "AI-generated answer here",
    "highlights": [
      {
        "id": "highlight_2",
        "page": 1,
        "x": 150.0,
        "y": 250.0,
        "width": 180.0,
        "height": 22.0,
        "text": "Supporting text"
      }
    ]
  }
}
```

## 🎯 **Success Indicators**

✅ **Frontend loads** without errors  
✅ **PDF upload** works and shows progress  
✅ **PDF displays** with zoom/navigation controls  
✅ **Highlights appear** on the PDF  
✅ **Questions get AI responses**  
✅ **Highlight references** work in Q&A  

## 🚨 **Common Issues & Solutions**

### **CORS Errors:**
```
Access to fetch at 'http://localhost:8000/api/v1/...' from origin 'http://localhost:3000' has been blocked by CORS policy
```
**Solution**: Check backend CORS configuration

### **404 Errors:**
```
Failed to fetch: 404 Not Found
```
**Solution**: Verify API endpoint paths match

### **Response Format Errors:**
```
Invalid response format from backend
```
**Solution**: Check backend response structure

## 🎉 **Integration Complete!**

Once all tests pass, your frontend and backend are fully integrated and ready for production use!
