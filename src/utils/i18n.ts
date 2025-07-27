import { Language } from '../types';

const translations = {
  zh: {
    appTitle: 'Austin Math - 数学练习',
    configTitle: '题目设置',
    rangeInfo: '📊 自动包含加法和减法，每行2题，操作数 10~100（选择负数答案时可为负），答案 -100~100',
    problemCount: '题目数量',
    problemTypes: '题目类型',
    addition: '加法',
    subtraction: '减法',
    allowNegative: '允许负数答案',
    allowThreeOperands: '包含三个数字的题目',
    problemsPerRow: '每行题目数量',
    generateProblems: '生成题目',
    mathProblems: '数学练习题',
    totalProblems: '总题数',
    back: '返回设置',
    regenerate: '再次生成',
    print: '打印题目',
    savePDF: '保存PDF'
  },
  en: {
    appTitle: 'Austin Math - Math Practice',
    configTitle: 'Problem Settings',
    rangeInfo: '📊 Auto includes addition & subtraction, 2 per row, operands 10~100 (negative when allow negative answers), answers -100~100',
    problemCount: 'Number of Problems',
    problemTypes: 'Problem Types',
    addition: 'Addition',
    subtraction: 'Subtraction', 
    allowNegative: 'Allow Negative Answers',
    allowThreeOperands: 'Include Three-Number Problems',
    problemsPerRow: 'Problems Per Row',
    generateProblems: 'Generate Problems',
    mathProblems: 'Math Problems',
    totalProblems: 'Total Problems',
    back: 'Back to Settings',
    regenerate: 'Generate Again',
    print: 'Print Problems',
    savePDF: 'Save PDF'
  }
};

export function useTranslation(language: Language) {
  return (key: keyof typeof translations.zh) => {
    return translations[language][key] || key;
  };
}