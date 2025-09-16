'use client';

import type { propsType } from '@/components/features/CalculatorButton/types';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

const getButtonClass = (type: propsType['type']) => {
  switch (type) {
    case 'number':
      return 'bg-white border-2 border-gray-300 text-gray-900 hover:bg-gray-50 hover:border-gray-400';
    case 'operator':
      return 'bg-blue-500 text-white hover:bg-blue-600 border-2 border-blue-500 hover:border-blue-600';
    case 'function':
      return 'bg-gray-100 border-2 border-gray-300 text-gray-700 hover:bg-gray-200 hover:border-gray-400';
    case 'equals':
      return 'bg-blue-700 text-white hover:bg-blue-800 border-2 border-blue-700 hover:border-blue-800';
    default:
      return 'bg-white border-2 border-gray-300 text-gray-900 hover:bg-gray-50';
  }
};

export const CalculatorButton = ({ value, type, span, icon, ariaLabel, onClick }: propsType) => {
  return (
    <motion.div
      className={cn('rounded-xl', span)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button
        onClick={onClick}
        aria-label={ariaLabel ?? value}
        className={cn(
          'flex h-12 w-full items-center justify-center gap-2 rounded-md text-lg font-semibold shadow-sm transition-all duration-150 ease-in-out hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50',
          getButtonClass(type),
        )}
      >
        {icon ?? value}
      </Button>
    </motion.div>
  );
};
