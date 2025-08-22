import { CoordinateMapping } from '../types';

/**
 * Maps PDF coordinates to browser coordinates for highlight overlays
 */
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

  // Calculate scaled dimensions
  const scaledWidth = pageWidth * scale;
  const scaledHeight = pageHeight * scale;

  // Calculate offsets to center the PDF
  const offsetX = (containerWidth - scaledWidth) / 2;
  const offsetY = (containerHeight - scaledHeight) / 2;

  // Map PDF coordinates to browser coordinates
  const scaledX = pdfX * scale + offsetX;
  const scaledY = pdfY * scale + offsetY;
  const scaledHighlightWidth = pdfWidth * scale;
  const scaledHighlightHeight = pdfHeight * scale;

  return {
    originalX: pdfX,
    originalY: pdfY,
    originalWidth: pdfWidth,
    originalHeight: pdfHeight,
    scaledX,
    scaledY,
    scaledWidth: scaledHighlightWidth,
    scaledHeight: scaledHighlightHeight,
    scale,
  };
};

/**
 * Maps browser coordinates back to PDF coordinates
 */
export const mapBrowserToPDFCoordinates = (
  browserX: number,
  browserY: number,
  containerWidth: number,
  containerHeight: number,
  pageWidth: number,
  pageHeight: number
): { x: number; y: number } => {
  const scaleX = containerWidth / pageWidth;
  const scaleY = containerHeight / pageHeight;
  const scale = Math.min(scaleX, scaleY);

  const scaledWidth = pageWidth * scale;
  const scaledHeight = pageHeight * scale;
  const offsetX = (containerWidth - scaledWidth) / 2;
  const offsetY = (containerHeight - scaledHeight) / 2;

  const pdfX = (browserX - offsetX) / scale;
  const pdfY = (browserY - offsetY) / scale;

  return { x: pdfX, y: pdfY };
};
