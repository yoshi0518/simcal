import type { CalculatorActionsType, CalculatorStateType } from '@/types/calculator';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// const MAX_DIGITS = 12;
// const MAX_VALUE = 999999999999;
const INITIAL_STATE: CalculatorStateType = {
  display: '0',
  // previousValue: null,
  // operator: null,
  waitingForNewValue: false,
  // history: [],
  error: null,
  // showHistoryModal: false,
  // calculationExpression: '',
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
    }),
    {
      name: 'calculator-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
