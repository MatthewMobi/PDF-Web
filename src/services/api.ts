// API service layer for backend communication

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

export interface UploadPDFResponse {
  documentId: string;
  name: string;
  url: string;
  numPages: number;
  highlights: Array<{
    id: string;
    page: number;
    x: number;
    y: number;
    width: number;
    height: number;
    text: string;
    color?: string;
  }>;
}

export interface AskQuestionRequest {
  documentId: string;
  question: string;
  highlightIds?: string[];
}

export interface AskQuestionResponse {
  answer: string;
  highlights?: Array<{
    id: string;
    page: number;
    x: number;
    y: number;
    width: number;
    height: number;
    text: string;
  }>;
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Upload PDF and get processed document with highlights
  async uploadPDF(file: File): Promise<UploadPDFResponse> {
    const formData = new FormData();
    formData.append('pdf', file);

    const response = await fetch(`${API_BASE_URL}/documents/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const result = await response.json();
    
    // Handle the backend's response format
    if (result.success && result.data) {
      return result.data;
    }
    
    throw new Error('Invalid response format from backend');
  }

  // Ask a question about the document
  async askQuestion(request: AskQuestionRequest): Promise<AskQuestionResponse> {
    const result = await this.request<{ success: boolean; data: AskQuestionResponse }>('/questions/ask', {
      method: 'POST',
      body: JSON.stringify(request),
    });
    
    // Handle the backend's response format
    if (result.success && result.data) {
      return result.data;
    }
    
    throw new Error('Invalid response format from backend');
  }

  // Get document details
  async getDocument(documentId: string): Promise<UploadPDFResponse> {
    const result = await this.request<{ success: boolean; data: UploadPDFResponse }>(`/documents/${documentId}`);
    
    if (result.success && result.data) {
      return result.data;
    }
    
    throw new Error('Invalid response format from backend');
  }

  // Get document highlights
  async getHighlights(documentId: string): Promise<UploadPDFResponse['highlights']> {
    const result = await this.request<{ success: boolean; data: UploadPDFResponse['highlights'] }>(`/documents/${documentId}/highlights`);
    
    if (result.success && result.data) {
      return result.data;
    }
    
    throw new Error('Invalid response format from backend');
  }
}

export const apiService = new ApiService();
