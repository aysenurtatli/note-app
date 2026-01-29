"use client";
import { createContext, useContext, useState } from "react";

type LayoutContextType = {
  width: "minimal" | "full";
  setWidth: (width: "minimal" | "full") => void;
};

const LayoutContext = createContext<LayoutContextType | null>(null);

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [width, setWidth] = useState<"minimal" | "full">("minimal");

  return (
    <LayoutContext.Provider value={{ width, setWidth }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within LayoutProvider");
  }
  return context;
};
