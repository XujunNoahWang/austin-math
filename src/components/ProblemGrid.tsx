import React from 'react';
import { MathProblem, ProblemConfig } from '../types';

interface ProblemGridProps {
  problems: MathProblem[];
  config: ProblemConfig;
}

const ProblemGrid: React.FC<ProblemGridProps> = ({ problems, config }) => {
  const getGridClass = () => {
    // 固定每行2题
    return "grid gap-6 print:gap-4 grid-cols-1 md:grid-cols-2";
  };

  return (
    <div className={getGridClass()}>
      {problems.map((problem, index) => (
        <div 
          key={problem.id}
          className="border border-gray-200 p-4 rounded-md print:border-gray-400"
        >
          <div className="text-sm text-gray-500 mb-2">
            {index + 1}.
          </div>
          <div className="text-lg font-mono mb-4">
            {problem.expression} = ____
          </div>
          <div className="h-8 border-b border-gray-300 print:border-gray-400"></div>
        </div>
      ))}
    </div>
  );
};

export default ProblemGrid;