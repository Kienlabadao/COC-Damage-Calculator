import { GAME_DATA_TYPE } from "data/game";
import {
  createDefenseItem,
  DefenseItem,
} from "features/advance_calc/objects/defenseItem";
import { manageAdvanceCalcLevelPosGameDataLocalStorage } from "features/advance_calc/utils/LocalStorageData/manageAdvanceCalcLevelPosGameDataLocalStorage";

export function initDefenseItem(defenseID: string): DefenseItem {
  const { getOrStoreLevelPos } = manageAdvanceCalcLevelPosGameDataLocalStorage(
    defenseID,
    GAME_DATA_TYPE.Defense
  );
  const currentLevelPos = getOrStoreLevelPos();

  return createDefenseItem(defenseID, currentLevelPos);
}
