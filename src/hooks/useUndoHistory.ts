import { useEffect, useRef } from "react";

export interface HistoryState {
  value: string;
  sections: any[];
}

interface Options {
  limit?: number;
  delay?: number;
}

export default function useUndoHistory(
  value: string,
  sections: any[],
  applyState: (state: HistoryState) => void,
  { limit = 15, delay = 3000 }: Options = {}
) {
  const historyRef = useRef<HistoryState[]>([{ value, sections }]);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const isUndoingRef = useRef(false);

  const record = () => {
    const last = historyRef.current[historyRef.current.length - 1];
    if (!last || last.value !== value) {
      historyRef.current.push({ value, sections });
      if (historyRef.current.length > limit) historyRef.current.shift();
    }
  };

  useEffect(() => {
    if (isUndoingRef.current) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(record, delay);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [value]);

  const undo = () => {
    if (historyRef.current.length <= 1) return;
    historyRef.current.pop();
    const last = historyRef.current[historyRef.current.length - 1];
    isUndoingRef.current = true;
    applyState(last);
    setTimeout(() => {
      isUndoingRef.current = false;
    }, 0);
  };

  const reset = (newValue: string, newSections: any[]) => {
    historyRef.current = [{ value: newValue, sections: newSections }];
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
      e.preventDefault();
      undo();
    }
  };

  const canUndo = historyRef.current.length > 1;

  return { undo, handleKeyDown, canUndo, reset };
}
