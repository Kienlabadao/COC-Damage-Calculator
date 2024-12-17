import { isValidDefenseLevelPos } from "utils/GameData/gameDataUtils";

export interface BaseDefenseItem {
  id: string;
  defenseID: string;
  currentLevelPos: number;
}

export function createBaseDefenseItem(
  defenseID: string,
  currentLevelPos: number
): BaseDefenseItem {
  if (isValidDefenseLevelPos(defenseID, currentLevelPos)) {
    return {
      id: defenseID,
      defenseID: defenseID,
      currentLevelPos: currentLevelPos,
    };
  } else {
    throw new Error(
      `baseDefenseItem.createDefenseItem ERROR: currentLevelPos (${currentLevelPos}) is invalid. DefenseID: ${defenseID}`
    );
  }
}
