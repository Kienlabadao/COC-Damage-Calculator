import { createContext, useContext } from "react";

interface NumberInputFieldContextProps {
  id: string;
}

export const NumberInputFieldContext = createContext<
  NumberInputFieldContextProps | undefined
>(undefined);

export function useNumberInputFieldContext() {
  const context = useContext(NumberInputFieldContext);

  if (context === undefined) {
    throw new Error(
      "useNumberInputFieldContext.ERROR: useNumberInputFieldContext must be used within a OffenseSectionProvider"
    );
  }

  return context;
}
