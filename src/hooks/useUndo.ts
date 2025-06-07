import { useCallback, useState } from "react";

export default function useUndo<T>(initialValue: T, maxHistory = 15) {
  const [state, setState] = useState<T>(initialValue);
  const [history, setHistory] = useState<T[]>([]);

  const set = useCallback(
    (value: T | ((prev: T) => T)) => {
      setState((prev) => {
        const newValue = typeof value === "function" ? (value as (prev: T) => T)(prev) : value;
        setHistory((h) => [prev, ...h.slice(0, maxHistory - 1)]);
        return newValue;
      });
    },
    [maxHistory]
  );

  const reset = useCallback((value: T) => {
    setHistory([]);
    setState(value);
  }, []);

  const undo = useCallback(() => {
    setHistory((h) => {
      if (h.length === 0) return h;
      const [previous, ...rest] = h;
      setState(previous);
      return rest;
    });
  }, []);

  const canUndo = history.length > 0;

  return { state, set, reset, undo, canUndo } as const;
}
