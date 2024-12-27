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

export function getBaseModifiedImage(baseModifierItem: BaseModifierItem) {
  const { getModifierImage } = modifierDataUtils(baseModifierItem.modifierID);

  return getModifierImage();
}

export function compareBaseModifierItem(
  baseMO1: BaseModifierItem | undefined,
  baseMO2: BaseModifierItem | undefined
): boolean {
  if (baseMO1 === baseMO2) return true;
  if (!baseMO1 || !baseMO2) return false;

  return (
    baseMO1.id === baseMO2.id &&
    baseMO1.modifierID === baseMO2.modifierID &&
    baseMO1.currentLevelPos === baseMO2.currentLevelPos
  );
}
