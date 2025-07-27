import { MathProblem, ProblemConfig } from '../types';

export function generateProblems(config: ProblemConfig, existingProblems: MathProblem[] = []): MathProblem[] {
  const problems: MathProblem[] = [];
  const existingExpressions = new Set(existingProblems.map(p => p.expression));
  let attempts = 0;
  const maxTotalAttempts = config.count * 100;
  
  while (problems.length < config.count && attempts < maxTotalAttempts) {
    const operandCount = config.allowThreeOperands && Math.random() < 0.2 ? 3 : 2;
    const operator = Math.random() < 0.5 ? '+' : '-'; // 50%加法，50%减法
    const requiresComplexity = Math.random() < 0.8; // 80%需要复杂计算
    
    const problem = generateSingleProblem(operator, operandCount, config, requiresComplexity);
    
    if (!existingExpressions.has(problem.expression)) {
      problems.push({ ...problem, id: `problem-${problems.length}` });
      existingExpressions.add(problem.expression);
    }
    
    attempts++;
  }
  
  // 按操作数数量排序：两个数字的题目在前，三个数字的题目在后
  problems.sort((a, b) => a.operandCount - b.operandCount);
  
  // 重新设置题目ID，确保顺序正确
  problems.forEach((problem, index) => {
    problem.id = `problem-${index}`;
  });
  
  return problems;
}

function generateSingleProblem(
  operator: '+' | '-', 
  operandCount: number, 
  config: ProblemConfig,
  requiresComplexity: boolean = false
): Omit<MathProblem, 'id'> {
  let operands: number[] = [];
  let answer: number = 0;
  let attempts = 0;
  const maxAttempts = 1000;
  
  do {
    operands = generateMixedOperands(operandCount, operator, requiresComplexity, config.allowNegative);
    
    // 如果生成失败（返回空数组），继续尝试
    if (operands.length === 0) {
      attempts++;
      continue;
    }
    
    answer = calculateAnswer(operands, operator);
    
    // 验证答案是否在合理范围内
    const minAnswer = config.allowNegative ? -100 : 0;
    const maxAnswer = 100;
    
    if (answer >= minAnswer && answer <= maxAnswer) {
      break;
    }
    
    attempts++;
  } while (attempts < maxAttempts);
  
  // 如果尝试次数用完仍然没有成功，生成一个简单的有效题目
  if (operands.length === 0 || attempts >= maxAttempts) {
    if (operator === '+') {
      operands = [10, 10]; // 最简单的加法
      answer = 20;
    } else {
      operands = [20, 10]; // 最简单的减法
      answer = 10;
    }
  }
  
  const expression = formatExpression(operands, operator);
  
  return { expression, answer, operands, operator, operandCount: operands.length };
}

function generateMixedOperands(count: number, operator: '+' | '-', requiresComplexity: boolean, allowNegativeOperands: boolean = false): number[] {
  let attempts = 0;
  const maxAttempts = 200;
  
  while (attempts < maxAttempts) {
    const operands: number[] = [];
    
    // 生成操作数，范围-100到100，排除-9到9的简单数字
    for (let i = 0; i < count; i++) {
      let value: number;
      let valueAttempts = 0;
      
      do {
        if (allowNegativeOperands && Math.random() < 0.5) {
          // 生成负数：-100到-10（只有当允许负数操作数时）
          value = Math.floor(Math.random() * 91) - 100;
        } else {
          // 生成正数：10到100
          value = Math.floor(Math.random() * 91) + 10;
        }
        valueAttempts++;
      } while (valueAttempts < 50 && !isQualityNumber(value));
      
      operands.push(value);
    }
    
    // 计算答案
    const answer = calculateAnswer(operands, operator);
    
    // 检查答案是否在范围内
    if (answer < -100 || answer > 100) {
      attempts++;
      continue;
    }
    
    // 检查操作数是否过于相似
    if (!areOperandsQuality(operands)) {
      attempts++;
      continue;
    }
    
    // 检查复杂性要求
    const isComplex = checkComplexity(operands, operator, answer, allowNegativeOperands);
    
    if (requiresComplexity && isComplex) {
      return operands;
    } else if (!requiresComplexity && !isComplex) {
      return operands;
    }
    
    attempts++;
  }
  
  // 兜底：生成基础题目
  if (operator === '+') {
    return requiresComplexity ? [-23, 47] : [20, 30];
  } else {
    return requiresComplexity ? [-15, -28] : [50, 20];
  }
}

function isQualityNumber(num: number): boolean {
  const absNum = Math.abs(num);
  
  // 排除个位和十位数相同的数字（如11, 22, 33, 44...）
  if (absNum >= 11 && absNum <= 99) {
    const tens = Math.floor(absNum / 10);
    const ones = absNum % 10;
    if (tens === ones) {
      return false; // 11, 22, 33等重复数字
    }
  }
  
  // 排除整十数（如10, 20, 30...），这些太简单
  if (absNum % 10 === 0) {
    return false;
  }
  
  return true;
}

function areOperandsQuality(operands: number[]): boolean {
  // 检查操作数之间是否过于相似
  for (let i = 0; i < operands.length; i++) {
    for (let j = i + 1; j < operands.length; j++) {
      const num1 = Math.abs(operands[i]);
      const num2 = Math.abs(operands[j]);
      
      // 排除十位数相同的情况（如11和14, 44和41）
      if (num1 >= 10 && num2 >= 10) {
        const tens1 = Math.floor(num1 / 10);
        const tens2 = Math.floor(num2 / 10);
        if (tens1 === tens2) {
          return false;
        }
      }
      
      // 排除数字过于接近的情况（差值小于5）
      if (Math.abs(num1 - num2) < 5) {
        return false;
      }
    }
  }
  
  return true;
}

function checkComplexity(operands: number[], operator: '+' | '-', answer: number, allowNegativeOperands: boolean): boolean {
  if (allowNegativeOperands) {
    // 当允许负数操作数时的复杂性判断：
    // 1. 包含负数操作数
    // 2. 需要符号变化思考
    // 3. 答案是负数
    // 4. 涉及多步计算思考
    
    const hasNegativeOperands = operands.some(num => num < 0);
    const hasSignChanges = operands.some(num => num < 0) && operands.some(num => num > 0);
    const resultIsNegative = answer < 0;
    const requiresMentalMath = Math.abs(answer) > 50 || hasNegativeOperands;
    
    return hasNegativeOperands || hasSignChanges || resultIsNegative || requiresMentalMath;
  } else {
    // 当不允许负数操作数时的复杂性判断（只有正数操作数）：
    // 1. 需要进位或退位计算
    // 2. 答案较大（>50）
    // 3. 操作数较大（有超过50的）
    // 4. 减法结果为负数（如果允许负数答案）
    
    const resultIsNegative = answer < 0;
    const largeResult = Math.abs(answer) > 50;
    const hasLargeOperands = operands.some(num => Math.abs(num) > 50);
    
    // 检查是否需要进位或退位
    const needsCarryOrBorrow = checkCarryOrBorrow(operands, operator);
    
    return needsCarryOrBorrow || largeResult || hasLargeOperands || resultIsNegative;
  }
}

function checkCarryOrBorrow(operands: number[], operator: '+' | '-'): boolean {
  if (operator === '+') {
    // 检查是否需要进位（个位数之和 >= 10）
    const onesSum = operands.reduce((sum, num) => sum + (Math.abs(num) % 10), 0);
    return onesSum >= 10;
  } else {
    // 检查是否需要退位（被减数个位 < 减数个位）
    if (operands.length >= 2) {
      const minuendOnes = Math.abs(operands[0]) % 10;
      const subtrahendOnes = operands.slice(1).reduce((sum, num) => sum + (Math.abs(num) % 10), 0) % 10;
      return minuendOnes < subtrahendOnes;
    }
  }
  return false;
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
  if (operands.length === 0) return '';
  
  let expression = operands[0].toString();
  
  for (let i = 1; i < operands.length; i++) {
    const operand = operands[i];
    if (operand < 0) {
      // 负数：-32 + (-15) 显示为 -32 - 15
      if (operator === '+') {
        expression += ` - ${Math.abs(operand)}`;
      } else {
        // -32 - (-15) 显示为 -32 + 15
        expression += ` + ${Math.abs(operand)}`;
      }
    } else {
      // 正数：正常显示
      expression += ` ${operator} ${operand}`;
    }
  }
  
  return expression;
}