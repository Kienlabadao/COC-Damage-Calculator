import { GAME_DATA_TYPE } from "data/game";
import { manageAdvanceCalcLevelPosGameDataLocalStorage } from "features/advance_calc/utils/LocalStorageData/manageAdvanceCalcLevelPosGameDataLocalStorage";
import { ModifierItem } from "features/advance_calc/objects/modifierItem";
import { initModifierItem } from "../../ModifierItem";
import { manageAdvanceCalcUseGameDataLocalStorage } from "features/advance_calc/utils/LocalStorageData/manageAdvanceCalcUseGameDataLocalStorage";

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
