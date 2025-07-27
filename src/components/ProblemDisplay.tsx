import React from 'react';
import { MathProblem, ProblemConfig } from '../types';
import ProblemGrid from './ProblemGrid';
import { useTranslation } from '../utils/i18n';

interface ProblemDisplayProps {
  problems: MathProblem[];
  config: ProblemConfig;
  onBack: () => void;
  onRegenerate: () => void;
  language: 'zh' | 'en';
}

const ProblemDisplay: React.FC<ProblemDisplayProps> = ({ 
  problems, 
  config, 
  onBack, 
  onRegenerate,
  language 
}) => {
  const t = useTranslation(language);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6 print:hidden">
        <button
          onClick={onBack}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
        >
          {t('back')}
        </button>
        <div className="flex gap-3">
          <button
            onClick={onRegenerate}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {t('regenerate')}
          </button>
          <button
            onClick={handlePrint}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            {t('print')}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 print:shadow-none print:p-0">
        <div className="text-center mb-6 print:mb-8">
          <h2 className="text-2xl font-bold">{t('mathProblems')}</h2>
          <p className="text-gray-600 mt-2">
            {t('totalProblems')}: {problems.length}
          </p>
        </div>

        <ProblemGrid problems={problems} config={config} />
      </div>
    </div>
  );
};

export default ProblemDisplay;