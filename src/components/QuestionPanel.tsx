import React, { useState, useCallback } from 'react';
import { Question } from '../types';

interface QuestionPanelProps {
  questions: Question[];
  onAskQuestion: (question: string) => void;
  isLoading?: boolean;
  selectedHighlight?: string;
}

const QuestionPanel: React.FC<QuestionPanelProps> = ({
  questions,
  onAskQuestion,
  isLoading = false,
  selectedHighlight
}) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() && !isLoading) {
      onAskQuestion(question.trim());
      setQuestion('');
    }
  }, [question, onAskQuestion, isLoading]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }, [handleSubmit]);

  return (
    <div className="flex flex-col h-full bg-white border-l border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Ask Questions</h2>
        <p className="text-sm text-gray-600 mt-1">
          Ask questions about the document and get AI-powered answers
        </p>
      </div>

      {/* Question Input */}
      <div className="p-4 border-b border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                selectedHighlight
                  ? "Ask a question about the selected text..."
                  : "Ask a question about the document..."
              }
              className="input-field resize-none"
              rows={3}
              disabled={isLoading}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">
              Press Enter to send, Shift+Enter for new line
            </div>
            <button
              type="submit"
              disabled={!question.trim() || isLoading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Asking...</span>
                </div>
              ) : (
                'Ask Question'
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Questions and Answers */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {questions.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No questions yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Start by asking a question about the document above.
            </p>
          </div>
        ) : (
          questions.map((q) => (
            <div key={q.id} className="space-y-3">
              {/* Question */}
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{q.question}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {q.timestamp.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Answer */}
              <div className="bg-primary-50 rounded-lg p-3 ml-6">
                <div className="flex items-start space-x-2">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 whitespace-pre-wrap">{q.answer}</p>
                    {q.highlights && q.highlights.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-600 mb-1">Referenced text:</p>
                        <div className="space-y-1">
                          {q.highlights.map((highlight) => (
                            <div
                              key={highlight.id}
                              className="text-xs bg-yellow-100 border border-yellow-200 rounded px-2 py-1"
                            >
                              "{highlight.text}"
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default QuestionPanel;
