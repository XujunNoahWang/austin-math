import React from 'react';
import { MathProblem, ProblemConfig } from '../types';

interface ProblemGridProps {
  problems: MathProblem[];
  config: ProblemConfig;
}

const ProblemGrid: React.FC<ProblemGridProps> = ({ problems, config }) => {
  const getGridClass = () => {
    // 固定每行2题，打印时也保持2列布局
    return "grid gap-6 print:gap-4 grid-cols-1 md:grid-cols-2 print:grid-cols-2";
  };

  return (
    <div className={getGridClass()}>
      {problems.map((problem, index) => (
        <div 
          key={problem.id}
          className="border border-gray-200 p-4 rounded-md print:border-gray-400 print:p-2"
        >
          <div className="text-sm text-gray-500 mb-2 print:mb-1 print:text-sm">
            {index + 1}.
          </div>
          <div className="text-lg font-mono mb-4 print:mb-2 print:text-base">
            {problem.expression} = ____
          </div>
          <div className="h-8 border-b border-gray-300 print:border-gray-400 print:h-6"></div>
        </div>
      ))}
    </div>
  );
};

export default ProblemGrid;