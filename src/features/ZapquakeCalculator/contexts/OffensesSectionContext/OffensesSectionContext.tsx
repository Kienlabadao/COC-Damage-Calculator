import { createContext, useContext } from "react";
import { OffenseType } from "data/Game";
import { OffenseItem } from "features/ZapquakeCalculator/objects/offenseItem";
import { DonatedLightningSpellItem } from "features/ZapquakeCalculator/objects/donatedLightningSpellItem";
import { EarthquakeOrder } from "features/ZapquakeCalculator/data/constants";

interface OffensesSectionContextProps {
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
