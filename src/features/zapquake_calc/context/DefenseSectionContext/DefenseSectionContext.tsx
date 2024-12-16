import { DefenseItem } from "features/zapquake_calc/objects/defenseItem";
import { createContext, useContext } from "react";

interface DefenseSectionContextProps {
  defenseItemList: DefenseItem[];
  updateDefenseItem: (defenseID: string, currentLevelPos: number) => void;
  setAllDefensesToMax: () => void;
  setAllDefensesToMin: () => void;
}

export const DefenseSectionContext = createContext<
  DefenseSectionContextProps | undefined
>(undefined);

export function useDefenseSectionContext() {
  const context = useContext(DefenseSectionContext);

  if (context === undefined) {
    throw new Error(
      "useDefenseSectionContext.ERROR: useDefenseSectionContext must be used within a DefenseSectionProvider"
    );
  }

  return context;
}
