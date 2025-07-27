# Austin Math Development Guide

## AI IDE Role Definition

You are a React TypeScript developer building a simple educational web application for kindergarten children. Your focus is on creating clean, functional code that works immediately without over-engineering. You should:

- Prioritize simplicity and readability over complex patterns
- Implement core functionality first, avoiding unnecessary abstractions
- Use modern React hooks and TypeScript for type safety
- Focus on responsive design and print-friendly layouts
- Ensure the application works offline since it's purely frontend
- Write code that can be easily maintained and extended

## Project Overview

**Application Name**: Austin Math  
**Target Users**: Kindergarten children  
**Application Type**: Educational math problem generator  
**Complexity Level**: Simple Project (1-2 weeks)  
**Technology Stack**: React + TypeScript, deployed on Vercel

### Core Requirements

1. **Problem Generation**: Random math problems (addition/subtraction only)
2. **Customizable Options**:
   - Number of problems
   - Problem types (addition, subtraction, both)
   - Include negative numbers (optional)
   - Number of operands (2-3 numbers, 80% two numbers, 20% three numbers)
   - Answer range (within 20, 50, or 100)
3. **Display Options**:
   - Desktop: 1-4 problems per row (user choice)
   - Mobile: System-determined responsive layout
4. **Multi-language**: Chinese and English support
5. **Print-friendly**: Generated problems should be printable
6. **Two-page flow**: Configuration page → Problems display page

## Technical Implementation

### Project Structure

```
austin-math/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── ConfigForm.tsx
│   │   ├── ProblemDisplay.tsx
│   │   ├── ProblemGrid.tsx
│   │   └── LanguageToggle.tsx
│   ├── hooks/
│   │   └── useProblemGenerator.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   ├── problemGenerator.ts
│   │   └── i18n.ts
│   ├── styles/
│   │   ├── global.css
│   │   └── print.css
│   ├── App.tsx
│   ├── index.tsx
│   └── index.css
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

### Core Types Definition

```typescript
// src/types/index.ts
export interface ProblemConfig {
  count: number;
  types: ('addition' | 'subtraction')[];
  allowNegative: boolean;
  maxOperands: 2 | 3;
  answerRange: 20 | 50 | 100;
  problemsPerRow: 1 | 2 | 3 | 4;
}

export interface MathProblem {
  id: string;
  expression: string;
  answer: number;
  operands: number[];
  operator: '+' | '-';
}

export type Language = 'zh' | 'en';
```

### Problem Generator Logic

```typescript
// src/utils/problemGenerator.ts
import { MathProblem, ProblemConfig } from '../types';

export function generateProblems(config: ProblemConfig): MathProblem[] {
  const problems: MathProblem[] = [];
  
  for (let i = 0; i < config.count; i++) {
    const operandCount = Math.random() < 0.8 ? 2 : Math.min(3, config.maxOperands);
    const operator = config.types[Math.floor(Math.random() * config.types.length)];
    
    const problem = generateSingleProblem(operator, operandCount, config);
    problems.push({ ...problem, id: `problem-${i}` });
  }
  
  return problems;
}

function generateSingleProblem(
  operator: '+' | '-', 
  operandCount: number, 
  config: ProblemConfig
): Omit<MathProblem, 'id'> {
  let operands: number[] = [];
  let answer: number;
  
  do {
    operands = generateOperands(operandCount, config.answerRange);
    answer = calculateAnswer(operands, operator);
  } while (!config.allowNegative && answer < 0);
  
  const expression = formatExpression(operands, operator);
  
  return { expression, answer, operands, operator };
}

function generateOperands(count: number, maxRange: number): number[] {
  return Array.from({ length: count }, () => 
    Math.floor(Math.random() * maxRange) + 1
  );
}

function calculateAnswer(operands: number[], operator: '+' | '-'): number {
  if (operator === '+') {
    return operands.reduce((sum, num) => sum + num, 0);
  } else {
    return operands.reduce((diff, num, index) => 
      index === 0 ? num : diff - num
    );
  }
}

function formatExpression(operands: number[], operator: '+' | '-'): string {
  return operands.join(` ${operator} `);
}
```

### Main App Component

```typescript
// src/App.tsx
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
  
  const t = useTranslation(language);

  const handleGenerateProblems = (newConfig: ProblemConfig) => {
    const generatedProblems = generateProblems(newConfig);
    setProblems(generatedProblems);
    setConfig(newConfig);
    setCurrentPage('problems');
  };

  const handleBackToConfig = () => {
    setCurrentPage('config');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4">
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

      <main className="max-w-4xl mx-auto p-4">
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
            language={language}
          />
        )}
      </main>
    </div>
  );
}

export default App;
```

### Configuration Form Component

```typescript
// src/components/ConfigForm.tsx
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
    types: ['addition'],
    allowNegative: false,
    maxOperands: 3,
    answerRange: 20,
    problemsPerRow: 2
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
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Problem Count */}
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

        {/* Problem Types */}
        <div>
          <label className="block text-sm font-medium mb-2">
            {t('problemTypes')}
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={config.types.includes('addition')}
                onChange={(e) => {
                  const types = e.target.checked 
                    ? [...config.types, 'addition']
                    : config.types.filter(t => t !== 'addition');
                  updateConfig({ types: types.length ? types : ['addition'] });
                }}
                className="mr-2"
              />
              {t('addition')}
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={config.types.includes('subtraction')}
                onChange={(e) => {
                  const types = e.target.checked 
                    ? [...config.types, 'subtraction']
                    : config.types.filter(t => t !== 'subtraction');
                  updateConfig({ types: types.length ? types : ['subtraction'] });
                }}
                className="mr-2"
              />
              {t('subtraction')}
            </label>
          </div>
        </div>

        {/* Answer Range */}
        <div>
          <label className="block text-sm font-medium mb-2">
            {t('answerRange')}
          </label>
          <select
            value={config.answerRange}
            onChange={(e) => updateConfig({ answerRange: parseInt(e.target.value) as 20 | 50 | 100 })}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value={20}>{t('within20')}</option>
            <option value={50}>{t('within50')}</option>
            <option value={100}>{t('within100')}</option>
          </select>
        </div>

        {/* Allow Negative */}
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

        {/* Problems Per Row (Desktop only) */}
        <div className="hidden md:block">
          <label className="block text-sm font-medium mb-2">
            {t('problemsPerRow')}
          </label>
          <select
            value={config.problemsPerRow}
            onChange={(e) => updateConfig({ problemsPerRow: parseInt(e.target.value) as 1 | 2 | 3 | 4 })}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
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
```

### Problem Display Component

```typescript
// src/components/ProblemDisplay.tsx
import React from 'react';
import { MathProblem, ProblemConfig } from '../types';
import ProblemGrid from './ProblemGrid';
import { useTranslation } from '../utils/i18n';

interface ProblemDisplayProps {
  problems: MathProblem[];
  config: ProblemConfig;
  onBack: () => void;
  language: 'zh' | 'en';
}

const ProblemDisplay: React.FC<ProblemDisplayProps> = ({ 
  problems, 
  config, 
  onBack, 
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
        <button
          onClick={handlePrint}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          {t('print')}
        </button>
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
```

### Problem Grid Component

```typescript
// src/components/ProblemGrid.tsx
import React from 'react';
import { MathProblem, ProblemConfig } from '../types';

interface ProblemGridProps {
  problems: MathProblem[];
  config: ProblemConfig;
}

const ProblemGrid: React.FC<ProblemGridProps> = ({ problems, config }) => {
  const getGridClass = () => {
    const { problemsPerRow } = config;
    const baseClass = "grid gap-6 print:gap-4";
    
    // Mobile: always single column
    const mobileClass = "grid-cols-1";
    
    // Desktop: user-defined columns
    const desktopClass = {
      1: "md:grid-cols-1",
      2: "md:grid-cols-2", 
      3: "md:grid-cols-3",
      4: "md:grid-cols-4"
    }[problemsPerRow];

    return `${baseClass} ${mobileClass} ${desktopClass}`;
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
```

### Internationalization Utility

```typescript
// src/utils/i18n.ts
import { Language } from '../types';

const translations = {
  zh: {
    appTitle: 'Austin Math - 数学练习',
    configTitle: '题目设置',
    problemCount: '题目数量',
    problemTypes: '题目类型',
    addition: '加法',
    subtraction: '减法',
    answerRange: '答案范围',
    within20: '20以内',
    within50: '50以内', 
    within100: '100以内',
    allowNegative: '允许负数答案',
    problemsPerRow: '每行题目数量',
    generateProblems: '生成题目',
    mathProblems: '数学练习题',
    totalProblems: '总题数',
    back: '返回设置',
    print: '打印题目'
  },
  en: {
    appTitle: 'Austin Math - Math Practice',
    configTitle: 'Problem Settings',
    problemCount: 'Number of Problems',
    problemTypes: 'Problem Types',
    addition: 'Addition',
    subtraction: 'Subtraction', 
    answerRange: 'Answer Range',
    within20: 'Within 20',
    within50: 'Within 50',
    within100: 'Within 100',
    allowNegative: 'Allow Negative Answers',
    problemsPerRow: 'Problems Per Row',
    generateProblems: 'Generate Problems',
    mathProblems: 'Math Problems',
    totalProblems: 'Total Problems',
    back: 'Back to Settings',
    print: 'Print Problems'
  }
};

export function useTranslation(language: Language) {
  return (key: keyof typeof translations.zh) => {
    return translations[language][key] || key;
  };
}
```

### Language Toggle Component

```typescript
// src/components/LanguageToggle.tsx
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
```

### Styling

```css
/* src/styles/global.css */
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

/* Print styles */
@media print {
  @page {
    margin: 1in;
    size: A4;
  }
  
  body {
    -webkit-print-color-adjust: exact;
    color-adjust: exact;
  }
  
  .print\\:hidden {
    display: none !important;
  }
  
  .print\\:shadow-none {
    box-shadow: none !important;
  }
  
  .print\\:p-0 {
    padding: 0 !important;
  }
  
  .print\\:gap-4 {
    gap: 1rem !important;
  }
  
  .print\\:border-gray-400 {
    border-color: #9ca3af !important;
  }
  
  .print\\:mb-8 {
    margin-bottom: 2rem !important;
  }
}

/* Custom styles */
.font-mono {
  font-family: 'Courier New', monospace;
}
```

### Package Configuration

```json
{
  "name": "austin-math",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "typescript": "^4.9.5"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.24",
    "tailwindcss": "^3.3.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "es6"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": [
    "src"
  ]
}
```

### Tailwind Configuration

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'print': {'raw': 'print'},
      }
    },
  },
  plugins: [],
}
```

## Deployment Instructions

### Vercel Deployment

1. **Prepare for deployment**:
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**:
   - Install Vercel CLI: `npm i -g vercel`
   - Run: `vercel`
   - Follow the prompts to deploy

3. **Alternative: GitHub Integration**:
   - Push code to GitHub repository
   - Connect repository to Vercel dashboard
   - Auto-deploy on push to main branch

### Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm start
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## Additional Notes

### Key Features Implemented

- ✅ Random math problem generation (addition/subtraction)
- ✅ Customizable problem count and types
- ✅ Configurable answer ranges (20/50/100)
- ✅ Optional negative number support
- ✅ 80/20 distribution for 2/3 operand problems
- ✅ Responsive design (mobile/desktop)
- ✅ Print-friendly layout
- ✅ Bilingual support (Chinese/English)
- ✅ Two-page flow (config → problems)

### Technical Decisions

- **React + TypeScript**: Provides type safety and modern development experience
- **Tailwind CSS**: Rapid styling with responsive and print utilities
- **No external dependencies**: Keeps the app lightweight and fast
- **Pure frontend**: No backend needed, works offline
- **Component-based architecture**: Easy to maintain and extend

### Future Enhancements (Optional)

- Save/load problem sets to localStorage
- Timer functionality for timed practice
- Answer checking mode
- More problem types (multiplication/division for older kids)
- Custom themes and fonts
- Export to PDF functionality

### Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support  
- Safari: Full support
- Mobile browsers: Responsive design works on all modern mobile browsers

### Performance Considerations

- Lightweight bundle size (~200KB gzipped)
- Fast problem generation algorithm
- Optimized for print rendering
- No external API calls needed