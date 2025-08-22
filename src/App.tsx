import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import PDFViewer from './components/PDFViewer';
import QuestionPanel from './components/QuestionPanel';
import { PDFDocument, Question, Highlight } from './types';
import { apiService, UploadPDFResponse, AskQuestionRequest } from './services/api';

const App: React.FC = () => {
  const [currentDocument, setCurrentDocument] = useState<PDFDocument | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAskingQuestion, setIsAskingQuestion] = useState(false);
  const [selectedHighlight, setSelectedHighlight] = useState<Highlight | null>(null);

  const handleFileSelect = useCallback(async (file: File) => {
    setIsLoading(true);
    
    try {
      // Call backend API to upload and process PDF
      const response: UploadPDFResponse = await apiService.uploadPDF(file);
      
      const newDocument: PDFDocument = {
        id: response.documentId,
        name: response.name,
        url: response.url,
        numPages: response.numPages,
        highlights: response.highlights
      };

      setCurrentDocument(newDocument);
      setQuestions([]);
      setSelectedHighlight(null);
    } catch (error) {
      console.error('Error processing PDF:', error);
      alert('Error processing PDF. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleAskQuestion = useCallback(async (questionText: string) => {
    if (!currentDocument) return;

    setIsAskingQuestion(true);
    
    try {
      // Create a new question
      const newQuestion: Question = {
        id: Date.now().toString(),
        question: questionText,
        answer: '', // Will be filled by AI response
        timestamp: new Date(),
        highlights: selectedHighlight ? [selectedHighlight] : undefined
      };

      // Add question to list immediately
      setQuestions(prev => [newQuestion, ...prev]);

      // Call backend API to get AI response
      const request: AskQuestionRequest = {
        documentId: currentDocument.id,
        question: questionText,
        highlightIds: selectedHighlight ? [selectedHighlight.id] : undefined
      };

      const response = await apiService.askQuestion(request);
      
      // Update the question with the AI response
      setQuestions(prev => 
        prev.map(q => 
          q.id === newQuestion.id 
            ? { 
                ...q, 
                answer: response.answer,
                highlights: response.highlights
              }
            : q
        )
      );

      setSelectedHighlight(null);
    } catch (error) {
      console.error('Error asking question:', error);
      alert('Error asking question. Please try again.');
    } finally {
      setIsAskingQuestion(false);
    }
  }, [currentDocument, selectedHighlight]);

  const handleHighlightClick = useCallback((highlight: Highlight) => {
    setSelectedHighlight(highlight);
  }, []);

  const handleNewDocument = useCallback(() => {
    setCurrentDocument(null);
    setQuestions([]);
    setSelectedHighlight(null);
  }, []);

  const handlePageChange = useCallback((pageNumber: number) => {
    // Handle page change if needed
    console.log('Page changed to:', pageNumber);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        documentName={currentDocument?.name}
        onNewDocument={handleNewDocument}
      />
      
      <main className="h-[calc(100vh-80px)]">
        {!currentDocument ? (
          <div className="flex items-center justify-center h-full p-8">
            <div className="w-full max-w-2xl">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Welcome to PDF Web Viewer
                </h2>
                <p className="text-gray-600">
                  Upload a PDF document to start analyzing it with AI-powered insights
                </p>
              </div>
              <FileUpload 
                onFileSelect={handleFileSelect}
                isLoading={isLoading}
              />
            </div>
          </div>
        ) : (
          <div className="flex h-full">
            {/* PDF Viewer */}
            <div className="flex-1 flex flex-col">
              <PDFViewer
                pdfUrl={currentDocument.url}
                highlights={currentDocument.highlights}
                onPageChange={handlePageChange}
                onHighlightClick={handleHighlightClick}
              />
            </div>
            
            {/* Question Panel */}
            <div className="w-96 flex-shrink-0">
              <QuestionPanel
                questions={questions}
                onAskQuestion={handleAskQuestion}
                isLoading={isAskingQuestion}
                selectedHighlight={selectedHighlight?.text}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
