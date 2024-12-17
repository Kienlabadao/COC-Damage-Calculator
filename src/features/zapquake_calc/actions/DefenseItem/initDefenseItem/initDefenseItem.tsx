import { GAME_DATA_TYPE } from "data/game";
import {
  createDefenseItem,
  DefenseItem,
} from "features/zapquake_calc/objects/defenseItem";
import { manageZapquakeCalcLevelPosGameDataLocalStorage } from "features/zapquake_calc/utils/LocalStorageData/manageZapquakeCalcLevelPosGameDataLocalStorage";
import { calculateDefense } from "../calculateDefense";
import { OffenseItem } from "features/zapquake_calc/objects/offenseItem";
import { DonatedLightningSpellItem } from "features/zapquake_calc/objects/donatedLightningSpellItem";
import { EarthquakeOrder } from "features/zapquake_calc/data/constants";

export function initDefenseItem(
  defenseID: string,
  offenseItemList: OffenseItem[],
  donatedLightningSpellItem: DonatedLightningSpellItem,
  earthquakeOrder: EarthquakeOrder
): DefenseItem {
  const { getOrStoreLevelPos } = manageZapquakeCalcLevelPosGameDataLocalStorage(
    defenseID,
    GAME_DATA_TYPE.Defense
  );
  const currentLevelPos = getOrStoreLevelPos();

  const { defenseStatus, spellCountList } = calculateDefense(
    defenseID,
    currentLevelPos,
    offenseItemList,
    donatedLightningSpellItem,
    earthquakeOrder
  );

  return createDefenseItem(
    defenseID,
    currentLevelPos,
    defenseStatus,
    spellCountList
  );
}
