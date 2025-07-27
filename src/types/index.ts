export interface ProblemConfig {
  count: number;
  allowNegative: boolean;
  allowThreeOperands: boolean;
}

export interface MathProblem {
  id: string;
  expression: string;
  answer: number;
  operands: number[];
  operator: '+' | '-';
  operandCount: number;
}

export type Language = 'zh' | 'en';