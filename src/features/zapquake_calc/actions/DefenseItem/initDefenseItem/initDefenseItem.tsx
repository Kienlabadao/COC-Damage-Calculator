import { GAME_DATA_TYPE } from "data/game";
import {
  createDefenseItem,
  DefenseItem,
} from "features/zapquake_calc/objects/defenseItem";
import { manageZapquakeCalcLevelPosGameDataLocalStorage } from "features/zapquake_calc/utils/LocalStorageData/manageZapquakeCalcLevelPosGameDataLocalStorage";

export function initDefenseItem(defenseID: string): DefenseItem {
  const { getOrStoreLevelPos } = manageZapquakeCalcLevelPosGameDataLocalStorage(
    defenseID,
    GAME_DATA_TYPE.Defense
  );
  const currentLevelPos = getOrStoreLevelPos();

  return createDefenseItem(defenseID, currentLevelPos);
}
