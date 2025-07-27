import React, { useState } from 'react';
import { ProblemConfig } from '../types';
import { useTranslation } from '../utils/i18n';

interface ConfigFormProps {
  onGenerate: (config: ProblemConfig) => void;
  language: 'zh' | 'en';
}

const ConfigForm: React.FC<ConfigFormProps> = ({ onGenerate, language }) => {
  const t = useTranslation(language);
  const [config, setConfig] = useState<ProblemConfig>({
    count: 20,
    allowNegative: true,
    allowThreeOperands: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(config);
  };

  const updateConfig = (updates: Partial<ProblemConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">{t('configTitle')}</h2>
      
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
        <p className="text-sm text-blue-800">
          {t('rangeInfo')}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            {t('problemCount')}
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={config.count}
            onChange={(e) => updateConfig({ count: parseInt(e.target.value) })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={config.allowNegative}
              onChange={(e) => updateConfig({ allowNegative: e.target.checked })}
              className="mr-2"
            />
            {t('allowNegative')}
          </label>
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={config.allowThreeOperands}
              onChange={(e) => updateConfig({ allowThreeOperands: e.target.checked })}
              className="mr-2"
            />
            {t('allowThreeOperands')}
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          {t('generateProblems')}
        </button>
      </form>
    </div>
  );
};

export default ConfigForm;