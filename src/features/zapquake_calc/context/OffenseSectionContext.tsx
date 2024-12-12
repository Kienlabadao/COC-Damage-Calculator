import { createContext, useContext } from "react";
import { OffenseItem } from "../utils/offenseItemUtils";
import { OffenseType } from "data/game";
import { DonatedLightningSpellItem } from "../utils/donatedLightningSpellItemUtils";

interface OffenseSectionContextProps {
  offenseItemList: OffenseItem[];
  donatedLightningSpellItem: DonatedLightningSpellItem;
  updateOffenseItem: (
    offenseID: string,
    isDonated?: boolean,
    currentLevelPos?: number,
    useOffense?: boolean,
    count?: number
  ) => void;
  setAllOffensesToMax: (offenseTypeFilterList: Set<OffenseType>) => void;
  setAllOffensesToMin: (offenseTypeFilterList: Set<OffenseType>) => void;
}

export const OffenseSectionContext = createContext<
  OffenseSectionContextProps | undefined
>(undefined);

export function useOffenseSectionContext() {
  const context = useContext(OffenseSectionContext);

  if (context === undefined) {
    throw new Error(
      "useOffenseSectionContext.ERROR: useOffenseSectionContext must be used within a OffenseSectionProvider"
    );
  }

  return context;
}
