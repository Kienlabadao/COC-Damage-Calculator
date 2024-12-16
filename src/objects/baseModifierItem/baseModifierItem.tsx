import { GAME_DATA_TYPE } from "data/game";
import { isValidGameDataLevelPos } from "utils/GameData/gameDataUtils";

export interface BaseModifierItem {
  modifierID: string;
  currentLevelPos: number;
}

export function createBaseModifierItem(
  modifierID: string,
  currentLevelPos: number
): BaseModifierItem {
  if (
    isValidGameDataLevelPos(
      currentLevelPos,
      modifierID,
      GAME_DATA_TYPE.Modifier
    )
  ) {
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
