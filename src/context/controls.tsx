import { createContext, useContext, useState, ReactNode } from "react";

type Controls = ReactNode;

type ControlsContextType = {
  controls: Controls | null;
  setControls: (controls: Controls) => void;

};

const ControlsContext = createContext<ControlsContextType | null>(null);

export function ControlsProvider({ children }: { children: ReactNode }) {
  const [controls, setControls] = useState<Controls>(null);

  return (
    <ControlsContext.Provider value={{ controls, setControls }}>
  {children}
  </ControlsContext.Provider>
);
}

export function useControls() {
  const ctx = useContext(ControlsContext);
  if (!ctx) throw new Error("useControls must be used inside ControlsProvider");
  return ctx;
}
