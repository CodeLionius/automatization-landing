import React from 'react';

interface CalculatorViewerProps {
  url: string;
  onClose: () => void;
  backText: string; // pridėta lokalizuoto teksto prop
}

const CalculatorViewer: React.FC<CalculatorViewerProps> = ({ url, onClose, backText }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={onClose} className="mb-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        ← {backText}
      </button>
      <iframe 
        src={url} 
        style={{ width: '100%', height: '800px', border: 'none' }} 
        sandbox="allow-scripts allow-forms allow-same-origin"
        referrerPolicy="strict-origin-when-cross-origin"
        loading="lazy"
        title="Calculator Tool"
      />
    </div>
  );
};

export default CalculatorViewer;
