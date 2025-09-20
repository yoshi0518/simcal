import { Button, Card, ScrollArea } from '@/components/ui';
import { useCalculatorStore } from '@/stores/calculator';
import { Trash2 } from 'lucide-react';

export const HistoryPanel = () => {
  const { history, clearHistory } = useCalculatorStore();

  return (
    <Card className="flex h-full min-h-0 flex-col rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-600">計算履歴</h3>
        {history.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            className="h-6 border-gray-300 px-2 text-xs text-gray-500 hover:text-gray-700"
            onClick={clearHistory}
          >
            <Trash2 className="h-3 w-3" />
            クリア
          </Button>
        )}
      </div>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <ScrollArea className="h-0 flex-1">
          {history.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-center text-xs text-gray-400">履歴がありません</p>
            </div>
          ) : (
            <div className="space-y-2">
              {history.map((item, index) => (
                <div
                  key={index}
                  className="roundec-md border border-gray-100 bg-white p-2 font-mono text-xs text-gray-600"
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </Card>
  );
};
