import { calculateModifiedValue } from "utils/GameData/gameDataCalculatorUtils";
import { isValidModifierLevelPos } from "utils/GameData/gameDataUtils";
import { modifierDataUtils } from "utils/GameData/modifierDataUtils";

export interface BaseModifierItem {
  id: string;
  modifierID: string;
  currentLevelPos: number;
}

export function createBaseModifierItem(
  modifierID: string,
  currentLevelPos: number
): BaseModifierItem {
  if (isValidModifierLevelPos(modifierID, currentLevelPos)) {
    return {
      id: modifierID,
      modifierID: modifierID,
      currentLevelPos: currentLevelPos,
    };
  } else {
    throw new Error(
      `baseModifierItem.createBaseModifierItem ERROR: currentLevelPos (${currentLevelPos}) is invalid. ModifierID: ${modifierID}`
    );
  }
}

export function getModifiedValue(
  baseValue: number,
  baseModifierItem: BaseModifierItem
) {
  const { getModifierModify } = modifierDataUtils(baseModifierItem.modifierID);

  return calculateModifiedValue(
    baseValue,
    getModifierModify(baseModifierItem.currentLevelPos)
  );
}

export function getBaseModifiedImage(baseModifierItem: BaseModifierItem) {
  const { getModifierImage } = modifierDataUtils(baseModifierItem.modifierID);

  return getModifierImage();
}
