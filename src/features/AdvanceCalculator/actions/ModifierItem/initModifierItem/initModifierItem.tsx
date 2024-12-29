import { GAME_DATA_TYPE } from "data/game";
import {
  createModifierItem,
  ModifierItem,
} from "features/advance_calc/objects/modifierItem";
import { manageAdvanceCalcLevelPosGameDataLocalStorage } from "features/advance_calc/utils/LocalStorageData/manageAdvanceCalcLevelPosGameDataLocalStorage";
import { manageAdvanceCalcUseGameDataLocalStorage } from "features/advance_calc/utils/LocalStorageData/manageAdvanceCalcUseGameDataLocalStorage";

const type = GAME_DATA_TYPE.Modifier;

export function initModifierItem(modifierID: string): ModifierItem {
  const { getOrStoreLevelPos } = manageAdvanceCalcLevelPosGameDataLocalStorage(
    modifierID,
    type
  );
  const currentLevelPos = getOrStoreLevelPos();

  const { getOrStoreUseOffense } = manageAdvanceCalcUseGameDataLocalStorage(
    modifierID,
    type
  );
  const useModifier = getOrStoreUseOffense();

  return createModifierItem(modifierID, currentLevelPos, useModifier);
}
