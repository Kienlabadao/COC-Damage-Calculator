import { GAME_DATA_TYPE } from "data/Game";
import {
  createDefenseItem,
  DefenseItem,
} from "features/ZapquakeCalculator/objects/defenseItem";
import { manageZapquakeCalcLevelPosGameDataLocalStorage } from "features/ZapquakeCalculator/utils/LocalStorageData/manageZapquakeCalcLevelPosGameDataLocalStorage";

export function initDefenseItem(defenseID: string): DefenseItem {
  const { getOrStoreLevelPos } = manageZapquakeCalcLevelPosGameDataLocalStorage(
    defenseID,
    GAME_DATA_TYPE.Defense
  );
  const currentLevelPos = getOrStoreLevelPos();

  return createDefenseItem(defenseID, currentLevelPos);
}
