# PDF Web Viewer

A professional React application for viewing PDF documents with AI-powered question-answering capabilities. Built with modern React, TypeScript, and Tailwind CSS.

## Features

- **PDF Upload & Viewing**: Drag-and-drop file upload with react-pdf for document display
- **Dynamic Highlight Overlays**: Precise coordinate mapping for rendering highlights on PDF content
- **AI Question-Answering**: Interactive Q&A panel with AI-generated responses
- **Responsive Design**: Fully responsive UI built with Tailwind CSS
- **Modern Architecture**: Functional components with React hooks and TypeScript

## Core Components

### FileUpload
- Drag-and-drop interface for PDF uploads
- File validation and loading states
- Professional UI with visual feedback

### PDFViewer
- PDF rendering with react-pdf
- Zoom controls and page navigation
- Coordinate mapping for highlight overlays

### HighlightOverlay
- Renders highlights on top of PDF content
- Precise coordinate calculations for different zoom levels
- Interactive highlights with tooltips

### QuestionPanel
- AI question-answering interface
- Real-time conversation display
- Highlight reference integration

## Technical Architecture

### Coordinate Mapping
The most complex part of the frontend involves mapping PDF coordinates to browser coordinates:

```typescript
// Maps PDF coordinates to browser coordinates for highlight overlays
export const mapPDFToBrowserCoordinates = (
  pdfX: number,
  pdfY: number,
  pdfWidth: number,
  pdfHeight: number,
  containerWidth: number,
  containerHeight: number,
  pageWidth: number,
  pageHeight: number
): CoordinateMapping => {
  // Calculate scale factors
  const scaleX = containerWidth / pageWidth;
  const scaleY = containerHeight / pageHeight;
  const scale = Math.min(scaleX, scaleY);

  // Calculate scaled dimensions and offsets
  const scaledWidth = pageWidth * scale;
  const scaledHeight = pageHeight * scale;
  const offsetX = (containerWidth - scaledWidth) / 2;
  const offsetY = (containerHeight - scaledHeight) / 2;

  // Map PDF coordinates to browser coordinates
  const scaledX = pdfX * scale + offsetX;
  const scaledY = pdfY * scale + offsetY;

  return {
    originalX: pdfX,
    originalY: pdfY,
    originalWidth: pdfWidth,
    originalHeight: pdfHeight,
    scaledX,
    scaledY,
    scaledWidth: pdfWidth * scale,
    scaledHeight: pdfHeight * scale,
    scale,
  };
};
```

### State Management
- Uses React hooks for local state management
- Callback-based communication between components
- TypeScript interfaces for type safety

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pdf-web-viewer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/          # React components
│   ├── FileUpload.tsx   # File upload interface
│   ├── PDFViewer.tsx    # Main PDF viewer
│   ├── HighlightOverlay.tsx # Highlight rendering
│   ├── QuestionPanel.tsx # Q&A interface
│   └── Header.tsx       # Application header
├── types/               # TypeScript type definitions
│   └── index.ts
├── utils/               # Utility functions
│   └── coordinateMapper.ts
├── App.tsx              # Main application component
├── index.tsx            # Application entry point
└── index.css            # Global styles with Tailwind
```

## Dependencies

### Core Dependencies
- **React 18**: Modern React with hooks
- **TypeScript**: Type safety and better development experience
- **react-pdf**: PDF rendering and manipulation
- **react-dropzone**: Drag-and-drop file uploads
- **Tailwind CSS**: Utility-first CSS framework

### Development Dependencies
- **react-scripts**: Create React App build tools
- **autoprefixer**: CSS vendor prefixing
- **postcss**: CSS processing

## API Integration

The application is designed to integrate with a backend API for:

1. **PDF Processing**: Upload and analyze PDF documents
2. **Highlight Extraction**: Extract text and coordinates from PDFs
3. **AI Question-Answering**: Process questions and generate responses

### Mock Implementation

Currently uses mock data for demonstration. Replace the mock API calls in `App.tsx` with real backend integration:

```typescript
// Example API integration
const handleFileSelect = async (file: File) => {
  const formData = new FormData();
  formData.append('pdf', file);
  
  const response = await fetch('/api/upload-pdf', {
    method: 'POST',
    body: formData
  });
  
  const document = await response.json();
  setCurrentDocument(document);
};
```

## Customization

### Styling
- Modify `tailwind.config.js` for theme customization
- Update component classes in individual files
- Add custom CSS in `src/index.css`

### Highlight Colors
- Modify highlight colors in `HighlightOverlay.tsx`
- Add color themes for different highlight types

### PDF Controls
- Customize zoom levels in `PDFViewer.tsx`
- Add additional navigation controls
- Implement custom PDF annotations

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Future Enhancements

- [ ] Multi-page PDF support
- [ ] Advanced annotation tools
- [ ] Export functionality
- [ ] Collaborative features
- [ ] Mobile optimization
- [ ] Offline support
