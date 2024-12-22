import { ModifierItem } from "features/advance_calc/objects/modifierItem";
import { createContext, useContext } from "react";

interface OffensesSectionContextProps {
  modifierItemList: ModifierItem[];
}

export const OffensesSectionContext = createContext<
  OffensesSectionContextProps | undefined
>(undefined);

export function useOffensesSectionContext() {
  const context = useContext(OffensesSectionContext);

  if (context === undefined) {
    throw new Error(
      "useOffensesSectionContext.ERROR: useOffensesSectionContext must be used within a OffenseSectionProvider"
    );
  }

  return context;
}
