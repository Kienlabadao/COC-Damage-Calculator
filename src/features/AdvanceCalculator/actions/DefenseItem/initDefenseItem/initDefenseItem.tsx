import { GAME_DATA_TYPE } from "data/Game";
import {
  createDefenseItem,
  DefenseItem,
} from "features/AdvanceCalculator/objects/defenseItem";
import { manageAdvanceCalcLevelPosGameDataLocalStorage } from "features/AdvanceCalculator/utils/LocalStorageData/manageAdvanceCalcLevelPosGameDataLocalStorage";

export function initDefenseItem(defenseID: string): DefenseItem {
  const { getOrStoreLevelPos } = manageAdvanceCalcLevelPosGameDataLocalStorage(
    defenseID,
    GAME_DATA_TYPE.Defense
  );
  const currentLevelPos = getOrStoreLevelPos();

  return createDefenseItem(defenseID, currentLevelPos);
}
