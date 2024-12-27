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

export function compareBaseDefenseItem(
  baseDF1: BaseDefenseItem | undefined,
  baseDF2: BaseDefenseItem | undefined
): boolean {
  if (baseDF1 === baseDF2) return true;
  if (!baseDF1 || !baseDF2) return false;

  return (
    baseDF1.id === baseDF2.id &&
    baseDF1.defenseID === baseDF2.defenseID &&
    baseDF1.currentLevelPos === baseDF2.currentLevelPos
  );
}
