import { isValidModifierLevelPos } from "utils/GameData/gameDataUtils";

export interface BaseModifierItem {
  modifierID: string;
  currentLevelPos: number;
}

export function createBaseModifierItem(
  modifierID: string,
  currentLevelPos: number
): BaseModifierItem {
  if (isValidModifierLevelPos(modifierID, currentLevelPos)) {
    return {
      modifierID: modifierID,
      currentLevelPos: currentLevelPos,
    };
  } else {
    throw new Error(
      `baseModifierItem.createBaseModifierItem ERROR: currentLevelPos (${currentLevelPos}) is invalid. ModifierID: ${modifierID}`
    );
  }
}
