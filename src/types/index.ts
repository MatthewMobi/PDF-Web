export interface Highlight {
  id: string;
  page: number;
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
  color?: string;
}

export interface Question {
  id: string;
  question: string;
  answer: string;
  timestamp: Date;
  highlights?: Highlight[];
}

export interface PDFDocument {
  id: string;
  name: string;
  url: string;
  numPages: number;
  highlights: Highlight[];
}

export interface CoordinateMapping {
  originalX: number;
  originalY: number;
  originalWidth: number;
  originalHeight: number;
  scaledX: number;
  scaledY: number;
  scaledWidth: number;
  scaledHeight: number;
  scale: number;
}
