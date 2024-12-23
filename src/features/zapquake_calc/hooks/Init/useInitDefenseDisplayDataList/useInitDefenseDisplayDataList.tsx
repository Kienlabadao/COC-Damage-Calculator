import { DefenseItem } from "features/zapquake_calc/objects/defenseItem";
import { OffenseItem } from "features/zapquake_calc/objects/offenseItem";
import { DonatedLightningSpellItem } from "features/zapquake_calc/objects/donatedLightningSpellItem";
import { EarthquakeOrder } from "features/zapquake_calc/data/constants";
import {
  createDefenseDisplayData,
  DefenseDisplayData,
} from "features/zapquake_calc/objects/defenseDisplayData";
import { useCacheDefenseLog } from "../../useCacheDefenseLog";

function initDefenseDisplayDataList(
  defenseItemList: DefenseItem[],
  updateDefense: (defenseID: string, currentLevelPos: number) => void,
  filteredOffenseItemList: OffenseItem[],
  donatedLightningSpellItem: DonatedLightningSpellItem,
  earthquakeOrder: EarthquakeOrder
): DefenseDisplayData[] {
  const retrieveOrRecalculateDefenseLog = useCacheDefenseLog();

  return defenseItemList.map((defenseItem) => {
    const id = defenseItem.id;

    const defenseLog = retrieveOrRecalculateDefenseLog(
      defenseItem,
      filteredOffenseItemList,
      donatedLightningSpellItem,
      earthquakeOrder
    );

    return createDefenseDisplayData(id, defenseItem, updateDefense, defenseLog);
  });
}

export function useInitDefenseDisplayDataList(
  defenseItemList: DefenseItem[],
  updateDefense: (defenseID: string, currentLevelPos: number) => void,
  filteredOffenseItemList: OffenseItem[],
  donatedLightningSpellItem: DonatedLightningSpellItem,
  earthquakeOrder: EarthquakeOrder
) {
  return initDefenseDisplayDataList(
    defenseItemList,
    updateDefense,
    filteredOffenseItemList,
    donatedLightningSpellItem,
    earthquakeOrder
  );
}
