import React, { useMemo } from 'react';
import { Highlight } from '../types';
import { mapPDFToBrowserCoordinates } from '../utils/coordinateMapper';

interface HighlightOverlayProps {
  highlights: Highlight[];
  containerWidth: number;
  containerHeight: number;
  pageWidth: number;
  pageHeight: number;
  scale: number;
  onHighlightClick?: (highlight: Highlight) => void;
}

const HighlightOverlay: React.FC<HighlightOverlayProps> = ({
  highlights,
  containerWidth,
  containerHeight,
  pageWidth,
  pageHeight,
  scale,
  onHighlightClick
}) => {
  const mappedHighlights = useMemo(() => {
    return highlights.map(highlight => {
      const mapping = mapPDFToBrowserCoordinates(
        highlight.x,
        highlight.y,
        highlight.width,
        highlight.height,
        containerWidth,
        containerHeight,
        pageWidth,
        pageHeight
      );

      return {
        ...highlight,
        mappedCoordinates: mapping
      };
    });
  }, [highlights, containerWidth, containerHeight, pageWidth, pageHeight]);

  const handleHighlightClick = (highlight: Highlight) => {
    onHighlightClick?.(highlight);
  };

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        width: containerWidth,
        height: containerHeight,
      }}
    >
      {mappedHighlights.map((highlight) => (
        <div
          key={highlight.id}
          className="absolute pointer-events-auto cursor-pointer transition-all duration-200 hover:opacity-80"
          style={{
            left: highlight.mappedCoordinates.scaledX,
            top: highlight.mappedCoordinates.scaledY,
            width: highlight.mappedCoordinates.scaledWidth,
            height: highlight.mappedCoordinates.scaledHeight,
            backgroundColor: highlight.color || 'rgba(255, 255, 0, 0.3)',
            border: `2px solid ${highlight.color || '#fbbf24'}`,
            borderRadius: '2px',
            zIndex: 10,
          }}
          onClick={() => handleHighlightClick(highlight)}
          title={highlight.text}
        >
          {/* Highlight tooltip on hover */}
          <div className="absolute bottom-full left-0 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20">
            {highlight.text.length > 50 
              ? `${highlight.text.substring(0, 50)}...` 
              : highlight.text
            }
          </div>
        </div>
      ))}
    </div>
  );
};

export default HighlightOverlay;
