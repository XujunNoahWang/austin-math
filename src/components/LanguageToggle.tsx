import React from 'react';
import { Language } from '../types';

interface LanguageToggleProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ 
  language, 
  onLanguageChange 
}) => {
  return (
    <div className="flex bg-gray-200 rounded-md p-1">
      <button
        onClick={() => onLanguageChange('zh')}
        className={`px-3 py-1 rounded text-sm transition-colors ${
          language === 'zh' 
            ? 'bg-white text-blue-600 shadow-sm' 
            : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        中文
      </button>
      <button
        onClick={() => onLanguageChange('en')}
        className={`px-3 py-1 rounded text-sm transition-colors ${
          language === 'en' 
            ? 'bg-white text-blue-600 shadow-sm' 
            : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        English
      </button>
    </div>
  );
};

export default LanguageToggle;