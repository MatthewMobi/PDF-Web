# 🌍 Environment Setup Guide

This guide explains how to set up and manage environment variables for different deployment stages.

## 📁 **Environment Files Structure**

```
PDF-WEB/
├── .env                    # ⚠️  IGNORED - Local overrides
├── .gitignore             # ✅ Protects sensitive files
├── env.development        # ✅ Development configuration
├── env.production         # ✅ Production configuration
└── env.example            # ✅ Template for new environments
```

## 🔒 **Security Protection**

### **Gitignore Protection:**
All `.env*` files are protected by `.gitignore`:
```gitignore
# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

### **Never Commit:**
- ❌ `.env` (local overrides)
- ❌ API keys
- ❌ Database credentials
- ❌ Secret tokens

### **Safe to Commit:**
- ✅ `env.development` (template)
- ✅ `env.production` (template)
- ✅ `env.example` (template)

## 🚀 **Quick Start**

### **Development Setup:**
```bash
# Set up development environment
npm run setup:dev

# Start development server
npm run start:dev
```

### **Production Setup:**
```bash
# Set up production environment
npm run setup:prod

# Build for production
npm run build:prod
```

## 📋 **Available Scripts**

| Script | Description |
|--------|-------------|
| `npm run setup:dev` | Copy development env to .env |
| `npm run setup:prod` | Copy production env to .env |
| `npm run start:dev` | Start dev server with dev env |
| `npm run start:prod` | Start dev server with prod env |
| `npm run build:dev` | Build with development env |
| `npm run build:prod` | Build with production env |

## 🔧 **Environment Variables**

### **Development (`env.development`):**
```bash
# API Configuration
REACT_APP_API_URL=http://localhost:8000/api/v1

# Environment
REACT_APP_ENVIRONMENT=development

# Development Settings
REACT_APP_DEBUG=true
REACT_APP_LOG_LEVEL=debug

# Feature Flags
REACT_APP_ENABLE_MOCK_DATA=false
REACT_APP_ENABLE_DEBUG_PANEL=true
```

### **Production (`env.production`):**
```bash
# API Configuration
REACT_APP_API_URL=https://your-production-backend.com/api/v1

# Environment
REACT_APP_ENVIRONMENT=production

# Production Settings
REACT_APP_DEBUG=false
REACT_APP_LOG_LEVEL=error

# Security
REACT_APP_ENABLE_HTTPS_ONLY=true
REACT_APP_ENABLE_CONTENT_SECURITY_POLICY=true
```

## 🎯 **Environment-Specific Features**

### **Development Features:**
- ✅ Debug panel enabled
- ✅ Performance monitoring
- ✅ Hot reload
- ✅ Source maps
- ✅ Detailed logging

### **Production Features:**
- ✅ HTTPS only
- ✅ Content Security Policy
- ✅ Error tracking
- ✅ Analytics
- ✅ Optimized builds

## 🔄 **Workflow**

### **Local Development:**
1. **Setup**: `npm run setup:dev`
2. **Start**: `npm run start:dev`
3. **Backend**: Run your Flask backend on port 8000
4. **Test**: Upload PDFs and ask questions

### **Production Deployment:**
1. **Setup**: `npm run setup:prod`
2. **Build**: `npm run build:prod`
3. **Deploy**: Upload `build/` folder to hosting service
4. **Configure**: Set environment variables on hosting platform

## 🛠 **Custom Environment Setup**

### **Create New Environment:**
```bash
# Copy template
cp env.example env.staging

# Edit configuration
nano env.staging

# Add to package.json scripts
"start:staging": "cp env.staging .env && react-scripts start"
```

### **Local Overrides:**
Create `.env.local` for local-only settings:
```bash
# .env.local (not committed)
REACT_APP_API_URL=http://localhost:8001/api/v1
REACT_APP_CUSTOM_SETTING=value
```

## 🔍 **Environment Detection**

The app automatically detects the environment:

```typescript
// In your React components
const isDevelopment = process.env.REACT_APP_ENVIRONMENT === 'development';
const isProduction = process.env.REACT_APP_ENVIRONMENT === 'production';

// Conditional features
if (process.env.REACT_APP_ENABLE_DEBUG_PANEL === 'true') {
  // Show debug panel
}
```

## 🚨 **Troubleshooting**

### **Environment Not Loading:**
```bash
# Check if .env exists
ls -la .env

# Recreate from template
npm run setup:dev
```

### **API URL Issues:**
```bash
# Verify environment variable
echo $REACT_APP_API_URL

# Check in browser console
console.log(process.env.REACT_APP_API_URL);
```

### **Build Issues:**
```bash
# Clear cache and rebuild
rm -rf node_modules/.cache
npm run build:dev
```

## 📊 **Environment Checklist**

### **Before Committing:**
- [ ] `.env` is in `.gitignore`
- [ ] No secrets in committed files
- [ ] Environment templates are up to date
- [ ] All team members have access to templates

### **Before Deployment:**
- [ ] Production environment is configured
- [ ] API URLs are correct
- [ ] Security settings are enabled
- [ ] Analytics are configured

## 🎉 **Best Practices**

1. **Always use templates** - Never commit actual `.env` files
2. **Document changes** - Update this guide when adding new variables
3. **Test environments** - Verify both dev and prod work
4. **Secure secrets** - Use hosting platform environment variables
5. **Version control** - Keep environment templates in git

Your environment setup is now secure and ready for both development and production! 🚀
