import { GAME_DATA_TYPE } from "data/game";
import {
  DefenseItem,
  updateDefenseItemInList,
} from "features/zapquake_calc/objects/defenseItem";
import { manageZapquakeCalcLevelPosGameDataLocalStorage } from "features/zapquake_calc/utils/LocalStorageData/manageZapquakeCalcLevelPosGameDataLocalStorage";
import { initDefenseItem } from "../initDefenseItem";
import { OffenseItem } from "features/zapquake_calc/objects/offenseItem";
import { DonatedLightningSpellItem } from "features/zapquake_calc/objects/donatedLightningSpellItem";
import { EarthquakeOrder } from "features/zapquake_calc/data/constants";

export function updateDefenseItem(
  defenseID: string,
  newCurrentLevelPos: number,
  defenseItemList: DefenseItem[],
  offenseItemList: OffenseItem[],
  donatedLightningSpellItem: DonatedLightningSpellItem,
  earthquakeOrder: EarthquakeOrder
): DefenseItem[] {
  const { storeLevelPos } = manageZapquakeCalcLevelPosGameDataLocalStorage(
    defenseID,
    GAME_DATA_TYPE.Defense
  );
  storeLevelPos(newCurrentLevelPos);

  const updateDefenseItem = initDefenseItem(
    defenseID,
    offenseItemList,
    donatedLightningSpellItem,
    earthquakeOrder
  );

  return updateDefenseItemInList(updateDefenseItem, defenseItemList);
}
