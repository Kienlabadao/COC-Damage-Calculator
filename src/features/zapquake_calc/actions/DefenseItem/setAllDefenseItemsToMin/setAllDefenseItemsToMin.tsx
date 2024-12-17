import { GAME_DATA_TYPE } from "data/game";
import { DefenseItem } from "features/zapquake_calc/objects/defenseItem";
import { getGameDataMinLevelPos } from "utils/GameData/gameDataUtils";
import { initDefenseItem } from "../initDefenseItem";
import { OffenseItem } from "features/zapquake_calc/objects/offenseItem";
import { DonatedLightningSpellItem } from "features/zapquake_calc/objects/donatedLightningSpellItem";
import { EarthquakeOrder } from "features/zapquake_calc/data/constants";
import { manageZapquakeCalcLevelPosGameDataLocalStorage } from "features/zapquake_calc/utils/LocalStorageData/manageZapquakeCalcLevelPosGameDataLocalStorage";

export function setAllDefenseItemsToMin(
  defenseItemList: DefenseItem[],
  offenseItemList: OffenseItem[],
  donatedLightningSpellItem: DonatedLightningSpellItem,
  earthquakeOrder: EarthquakeOrder
): DefenseItem[] {
  return defenseItemList.map((defense) => {
    const defenseID = defense.defenseID;
    const minLevelPos = getGameDataMinLevelPos(
      defenseID,
      GAME_DATA_TYPE.Defense
    );

    const { storeLevelPos } = manageZapquakeCalcLevelPosGameDataLocalStorage(
      defenseID,
      GAME_DATA_TYPE.Defense
    );
    storeLevelPos(minLevelPos);

    return initDefenseItem(
      defenseID,
      offenseItemList,
      donatedLightningSpellItem,
      earthquakeOrder
    );
  });
}
