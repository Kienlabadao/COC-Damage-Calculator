import { GAME_DATA_TYPE } from "data/game";
import { DefenseItem } from "features/zapquake_calc/objects/defenseItem";
import { manageZapquakeCalcLevelPosGameDataLocalStorage } from "features/zapquake_calc/utils/LocalStorageData/manageZapquakeCalcLevelPosGameDataLocalStorage";
import { initDefenseItem } from "../initDefenseItem";

export function updateDefenseItem(
  defenseID: string,
  newCurrentLevelPos: number
): DefenseItem {
  const { storeLevelPos } = manageZapquakeCalcLevelPosGameDataLocalStorage(
    defenseID,
    GAME_DATA_TYPE.Defense
  );
  storeLevelPos(newCurrentLevelPos);

  return initDefenseItem(defenseID);
}
