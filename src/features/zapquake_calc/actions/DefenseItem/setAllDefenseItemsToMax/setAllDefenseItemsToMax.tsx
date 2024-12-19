import { GAME_DATA_TYPE } from "data/game";
import { DefenseItem } from "features/zapquake_calc/objects/defenseItem";
import { getGameDataMaxLevelPos } from "utils/GameData/gameDataUtils";
import { initDefenseItem } from "../initDefenseItem";
import { manageZapquakeCalcLevelPosGameDataLocalStorage } from "features/zapquake_calc/utils/LocalStorageData/manageZapquakeCalcLevelPosGameDataLocalStorage";

export function setAllDefenseItemsToMax(
  defenseItemList: DefenseItem[]
): DefenseItem[] {
  return defenseItemList.map((defense) => {
    const defenseID = defense.defenseID;
    const maxLevelPos = getGameDataMaxLevelPos(
      defenseID,
      GAME_DATA_TYPE.Defense
    );

    const { storeLevelPos } = manageZapquakeCalcLevelPosGameDataLocalStorage(
      defenseID,
      GAME_DATA_TYPE.Defense
    );
    storeLevelPos(maxLevelPos);

    return initDefenseItem(defenseID);
  });
}