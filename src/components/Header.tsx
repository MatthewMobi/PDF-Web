import React from 'react';

interface HeaderProps {
  documentName?: string;
  onNewDocument?: () => void;
}

const Header: React.FC<HeaderProps> = ({ documentName, onNewDocument }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <svg
              className="w-8 h-8 text-primary-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h1 className="text-xl font-bold text-gray-900">PDF Web Viewer</h1>
          </div>
          
          {documentName && (
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">•</span>
              <span className="text-sm text-gray-600 font-medium truncate max-w-xs">
                {documentName}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-3">
          {onNewDocument && (
            <button
              onClick={onNewDocument}
              className="btn-secondary"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              New Document
            </button>
          )}
          
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>AI-Powered PDF Analysis</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
