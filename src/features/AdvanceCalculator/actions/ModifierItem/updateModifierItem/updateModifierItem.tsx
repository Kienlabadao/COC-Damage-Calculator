import { GAME_DATA_TYPE } from "data/Game";
import { manageAdvanceCalcLevelPosGameDataLocalStorage } from "features/AdvanceCalculator/utils/LocalStorageData/manageAdvanceCalcLevelPosGameDataLocalStorage";
import { ModifierItem } from "features/AdvanceCalculator/objects/modifierItem";
import { initModifierItem } from "../../ModifierItem";
import { manageAdvanceCalcUseGameDataLocalStorage } from "features/AdvanceCalculator/utils/LocalStorageData/manageAdvanceCalcUseGameDataLocalStorage";

const type = GAME_DATA_TYPE.Modifier;

export function updateModifierItem(
  modifierID: string,
  newCurrentLevelPos?: number,
  use?: boolean
): ModifierItem {
  if (newCurrentLevelPos !== undefined) {
    const { storeLevelPos } = manageAdvanceCalcLevelPosGameDataLocalStorage(
      modifierID,
      type
    );
    storeLevelPos(newCurrentLevelPos);
  }

  if (use !== undefined) {
    const { storeUseOffense } = manageAdvanceCalcUseGameDataLocalStorage(
      modifierID,
      type
    );
    storeUseOffense(use);
  }

  return initModifierItem(modifierID);
}
