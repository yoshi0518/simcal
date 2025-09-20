import type { CalculatorActionsType, CalculatorStateType, OperatorType } from '@/types/calculator';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const MAX_DIGITS = 12;
const MAX_VALUE = 999999999999;
const INITIAL_STATE: CalculatorStateType = {
  display: '0',
  previousValue: null,
  operator: null,
  waitingForNewValue: false,
  history: [],
  error: null,
  showHistoryModal: false,
  calculationExpression: '',
};

const formatNumber = (num: number): string => {
  if (isNaN(num) || !isFinite(num)) return 'エラー';

  const str = num.toString();
  if (str.length > MAX_DIGITS) {
    if (Math.abs(num) >= MAX_VALUE) {
      return 'オーバーフロー';
    }
    return num.toExponential(6);
  }

  // 整数部分と小数部分を分割
  const parts = str.split('.');
  // 整数部分にカンマを追加
  parts[0] = parts[0]?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') ?? '';
  // 少数部分を結合して返却
  return parts.join('.');
};

const formatHistoryNumber = (num: number): string => {
  const str = num.toString();
  const parts = str.split('.');
  parts[0] = parts[0]?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') ?? '';
  return parts.join('.');
};

const performCalculation = (prev: number, current: number, operator: OperatorType) => {
  switch (operator) {
    case '+':
      return prev + current;
    case '-':
      return prev - current;
    case '*':
      return prev * current;
    case '÷':
      if (current === 0) {
        throw new Error('0で除算することはできません');
      }
      return prev / current;
    default:
      return current;
  }
};

export const useCalculatorStore = create<CalculatorStateType & CalculatorActionsType>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      inputNumber: (number: string) => {
        const { display, waitingForNewValue, error } = get();

        if (error) {
          set({ error: null });
        }

        if (waitingForNewValue) {
          set({
            display: number,
            waitingForNewValue: false,
          });
          return;
        }

        if (display === '0') {
          set({ display: number });
          return;
        }

        set({ display: display + number });
      },

      inputDecimal: () => {
        const { display, waitingForNewValue, error } = get();

        if (error) {
          set({ error: null });
        }

        if (waitingForNewValue) {
          set({
            display: '0',
            waitingForNewValue: false,
          });
          return;
        }

        if (display.includes('.')) {
          return;
        }
        set({ display: display + '.' });
      },

      inputOperator: (operator: OperatorType) => {
        const { display, previousValue, operator: currentOperator, waitingForNewValue, calculationExpression } = get();

        if (previousValue !== null && currentOperator && !waitingForNewValue) {
          const currentValue = parseFloat(display);

          try {
            const result = performCalculation(previousValue, currentValue, currentOperator);

            if (!isFinite(result)) {
              throw new Error('計算結果が無限大になりました');
            }

            const formattedResult = formatNumber(result);

            if (['エラー', 'オーバーフロー'].includes(formattedResult)) {
              set({ error: formattedResult });
              return;
            }

            // 連続計算の場合は式を継続（現在の値を追加）
            const newExpression = calculationExpression
              ? `${calculationExpression} ${currentValue} ${operator}`
              : `${previousValue} ${currentOperator} ${currentValue} ${operator}`;

            set({
              display: formattedResult,
              previousValue: result,
              operator,
              waitingForNewValue: true,
              calculationExpression: newExpression,
            });
            return;
          } catch (error) {
            set({ error: error instanceof Error ? error.message : 'エラーが発生しました' });
          }
        }

        if (previousValue === null) {
          const newExpression = `${formatHistoryNumber(parseFloat(display))} ${operator}`;
          set({
            previousValue: parseFloat(display),
            operator,
            waitingForNewValue: true,
            calculationExpression: newExpression,
          });
          return;
        }

        if (waitingForNewValue) {
          const { calculationExpression } = get();
          // 最後の演算子を新しい演算子に置き換え
          const newExpression = calculationExpression.replace(/[+\-*÷]$/, operator);
          set({
            operator,
            calculationExpression: newExpression,
          });
          return;
        }
      },

      calculate: () => {
        const { display, previousValue, operator, calculationExpression } = get();

        if (previousValue === null || operator === null) {
          return;
        }

        const currentValue = parseFloat(display);

        try {
          const result = performCalculation(previousValue, currentValue, operator);

          if (!isFinite(result)) {
            throw new Error('計算結果が無限大になりました');
          }

          const formattedResult = formatNumber(result);

          if (formattedResult === 'エラー' || formattedResult === 'オーバーフロー') {
            set({ error: formattedResult });
            return;
          }

          // 完全な計算式を履歴に追加
          const finalExpression = calculationExpression
            ? `${calculationExpression} ${formatHistoryNumber(currentValue)} = ${formattedResult}`
            : `${formatHistoryNumber(previousValue)} ${operator} ${formatHistoryNumber(currentValue)} = ${formattedResult}`;

          set({
            display: formattedResult,
            previousValue: null,
            operator: null,
            waitingForNewValue: true,
            calculationExpression: '',
            history: [finalExpression, ...get().history].slice(-10),
          });
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'エラーが発生しました' });
        }
      },

      clear: () => {
        set({
          display: '0',
          waitingForNewValue: false,
          error: null,
        });
      },

      allClear: () => {
        set({
          display: '0',
          previousValue: null,
          operator: null,
          waitingForNewValue: false,
          error: null,
          showHistoryModal: false,
          calculationExpression: '',
        });
      },

      backspace: () => {
        const { display, waitingForNewValue, error } = get();

        if (error) {
          set({ error: null });
          return;
        }

        if (waitingForNewValue) {
          return;
        }

        if (display.length === 1 || display === '0') {
          set({ display: '0' });
          return;
        }

        set({ display: display.slice(0, -1) });
      },

      toggleSign: () => {
        const { display, error } = get();

        if (error) {
          set({ error: null });
        }

        if (display === '0') {
          return;
        }

        // カンマを除去してから符号を切り替え
        const cleanDisplay = display.replace(/,/g, '');
        let newDisplay: string;
        if (cleanDisplay.startsWith('-')) {
          newDisplay = cleanDisplay.slice(1);
        } else {
          newDisplay = '-' + cleanDisplay;
        }

        // カンマ区切りを再適用（3桁以下や小数点、負号がある場合はそのまま）
        let formattedDisplay = newDisplay;
        if (!newDisplay.includes('.') && !newDisplay.startsWith('-') && newDisplay.length > 3) {
          formattedDisplay = newDisplay.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        } else if (newDisplay.startsWith('-') && !newDisplay.includes('.') && newDisplay.length > 4) {
          // 負の数の場合（-を除いて3桁以上）
          const positiveNumber = newDisplay.slice(1);
          formattedDisplay = '-' + positiveNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }

        set({
          display: formattedDisplay,
          waitingForNewValue: false,
        });
      },

      setError: (error: string) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },

      clearHistory: () => {
        set({ history: [] });
      },
    }),
    {
      name: 'calculator-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
