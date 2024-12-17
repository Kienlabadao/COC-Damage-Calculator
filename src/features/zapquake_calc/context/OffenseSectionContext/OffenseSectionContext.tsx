import { createContext, useContext } from "react";
import { OffenseType } from "data/game";
import { OffenseItem } from "features/zapquake_calc/objects/offenseItem";
import { DonatedLightningSpellItem } from "features/zapquake_calc/objects/donatedLightningSpellItem";
import { EarthquakeOrder } from "features/zapquake_calc/data/constants";

interface OffenseSectionContextProps {
  offenseItemList: OffenseItem[];
  donatedLightningSpellItem: DonatedLightningSpellItem;
  updateOffense: (
    offenseID: string,
    type: OffenseType,
    isDonated?: boolean,
    currentLevelPos?: number,
    useOffense?: boolean,
    count?: number
  ) => void;
  setAllOffensesToMax: (offenseTypeFilterList: Set<OffenseType>) => void;
  setAllOffensesToMin: (offenseTypeFilterList: Set<OffenseType>) => void;
  earthquakeOrder: EarthquakeOrder;
  setEarthquakeOrder: React.Dispatch<React.SetStateAction<EarthquakeOrder>>;
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
