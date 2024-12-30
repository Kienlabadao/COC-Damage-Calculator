import { GAME_DATA_TYPE } from "data/Game";
import {
  createModifierItem,
  ModifierItem,
} from "features/AdvanceCalculator/objects/modifierItem";
import { manageAdvanceCalcLevelPosGameDataLocalStorage } from "features/AdvanceCalculator/utils/LocalStorageData/manageAdvanceCalcLevelPosGameDataLocalStorage";
import { manageAdvanceCalcUseGameDataLocalStorage } from "features/AdvanceCalculator/utils/LocalStorageData/manageAdvanceCalcUseGameDataLocalStorage";

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
