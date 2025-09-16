'use client';

import { CalculatorButton } from '@/components/features/CalculatorButton';
import { Card } from '@/components/ui';
import { cn } from '@/lib/utils';
import { ArrowLeft, Divide, Minus, Plus, X } from 'lucide-react';

export const Calculator = () => {
  const onClick = () => alert('clicked');

  return (
    <>
      <div className="flex w-full items-start justify-center gap-6 p-4">
        {/* 電卓本体 start */}
        <div className="w-full max-w-md">
          <Card className="gap-2rounded-2xl border-2 border-gray-300 bg-white p-6 shadow-lg">
            {/* ディスプレイ start */}
            <div className="my-2">
              <div className="flex min-h-[80px] items-center justify-end rounded-xl border-2 border-gray-200 bg-gray-50 p-4">
                <div
                  className={cn('text-right text-3xl font-bold break-all', false ? 'text-red-600' : 'text-gray-800')}
                  aria-live="polite"
                  aria-atomic="true"
                >
                  1230
                </div>
              </div>
            </div>
            {/* ディスプレイ end */}

            {/* ボタンエリア start */}
            <div className="grid grid-cols-4 gap-3">
              {/* 1行目 start */}
              <CalculatorButton
                value="AC"
                type="function"
                ariaLabel="All Clear"
                onClick={onClick}
              />

              <CalculatorButton
                value="C"
                type="function"
                ariaLabel="Clear"
                onClick={onClick}
              />

              <CalculatorButton
                value="←"
                type="function"
                icon={<ArrowLeft />}
                ariaLabel="Back Space"
                onClick={onClick}
              />

              <CalculatorButton
                value="÷"
                type="operator"
                icon={<Divide />}
                ariaLabel="Divide"
                onClick={onClick}
              />
              {/* 1行目 end */}

              {/* 2行目 start */}
              <CalculatorButton
                value="7"
                type="number"
                onClick={onClick}
              />

              <CalculatorButton
                value="8"
                type="number"
                onClick={onClick}
              />

              <CalculatorButton
                value="9"
                type="number"
                onClick={onClick}
              />

              <CalculatorButton
                value="×"
                type="operator"
                icon={<X />}
                ariaLabel="Multi"
                onClick={onClick}
              />
              {/* 2行目 end */}

              {/* 3行目 start */}
              <CalculatorButton
                value="4"
                type="number"
                onClick={onClick}
              />

              <CalculatorButton
                value="5"
                type="number"
                onClick={onClick}
              />

              <CalculatorButton
                value="6"
                type="number"
                onClick={onClick}
              />

              <CalculatorButton
                value="^"
                type="operator"
                icon={<Minus />}
                ariaLabel="Minus"
                onClick={onClick}
              />
              {/* 3行目 end */}

              {/* 4行目 start */}
              <CalculatorButton
                value="1"
                type="number"
                onClick={onClick}
              />

              <CalculatorButton
                value="2"
                type="number"
                onClick={onClick}
              />

              <CalculatorButton
                value="3"
                type="number"
                onClick={onClick}
              />

              <CalculatorButton
                value="+"
                type="operator"
                icon={<Plus />}
                ariaLabel="Plus"
                onClick={onClick}
              />
              {/* 4行目 end */}

              {/* 5行目 start */}
              <CalculatorButton
                value="0"
                type="number"
                span="col-span-2"
                onClick={onClick}
              />

              <CalculatorButton
                value="."
                type="number"
                onClick={onClick}
              />

              <CalculatorButton
                value="="
                type="equals"
                onClick={onClick}
              />
              {/* 5行目 end */}
            </div>
            {/* ボタンエリア end */}
          </Card>
        </div>
        {/* 電卓本体 end */}
      </div>
    </>
  );
};
