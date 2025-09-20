export type OperatorType = '+' | '-' | '*' | '÷';

export type CalculatorStateType = {
  display: string;
  previousValue: number | null;
  operator: OperatorType | null;
  waitingForNewValue: boolean;
  history: string[];
  error: string | null;
  showHistoryModal: boolean;
  calculationExpression: string;
};

export type CalculatorActionsType = {
  inputNumber: (number: string) => void;
  inputDecimal: () => void;
  inputOperator: (operator: OperatorType) => void;
  calculate: () => void;
  clear: () => void;
  allClear: () => void;
  backspace: () => void;
  toggleSign: () => void;
  setError: (error: string) => void;
  clearError: () => void;
  clearHistory: () => void;
};
