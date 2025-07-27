import React, { useState } from 'react';
import ConfigForm from './components/ConfigForm';
import ProblemDisplay from './components/ProblemDisplay';
import LanguageToggle from './components/LanguageToggle';
import { ProblemConfig, MathProblem, Language } from './types';
import { generateProblems } from './utils/problemGenerator';
import { useTranslation } from './utils/i18n';
import './styles/global.css';

function App() {
  const [currentPage, setCurrentPage] = useState<'config' | 'problems'>('config');
  const [problems, setProblems] = useState<MathProblem[]>([]);
  const [config, setConfig] = useState<ProblemConfig | null>(null);
  const [language, setLanguage] = useState<Language>('zh');
  const [allGeneratedProblems, setAllGeneratedProblems] = useState<MathProblem[]>([]);
  
  const t = useTranslation(language);

  const handleGenerateProblems = (newConfig: ProblemConfig) => {
    const isConfigChanged = !config || JSON.stringify(config) !== JSON.stringify(newConfig);
    const existingProblems = isConfigChanged ? [] : allGeneratedProblems;
    
    const generatedProblems = generateProblems(newConfig, existingProblems);
    setProblems(generatedProblems);
    setConfig(newConfig);
    
    if (isConfigChanged) {
      setAllGeneratedProblems(generatedProblems);
    } else {
      setAllGeneratedProblems(prev => [...prev, ...generatedProblems]);
    }
    
    setCurrentPage('problems');
  };

  const handleRegenerateProblems = () => {
    if (config) {
      const generatedProblems = generateProblems(config, allGeneratedProblems);
      setProblems(generatedProblems);
      setAllGeneratedProblems(prev => [...prev, ...generatedProblems]);
    }
  };

  const handleBackToConfig = () => {
    setCurrentPage('config');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4 print:hidden">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">
            {t('appTitle')}
          </h1>
          <LanguageToggle 
            language={language} 
            onLanguageChange={setLanguage} 
          />
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 print:p-0 print:max-w-none">
        {currentPage === 'config' ? (
          <ConfigForm 
            onGenerate={handleGenerateProblems}
            language={language}
          />
        ) : (
          <ProblemDisplay
            problems={problems}
            config={config!}
            onBack={handleBackToConfig}
            onRegenerate={handleRegenerateProblems}
            language={language}
          />
        )}
      </main>
    </div>
  );
}

export default App;