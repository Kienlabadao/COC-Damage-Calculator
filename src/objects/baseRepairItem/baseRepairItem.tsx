import { isValidRepairLevelPos } from "utils/GameData/gameDataUtils";

export interface BaseRepairItem {
  repairID: string;
  currentLevelPos: number;
}

export function createBaseRepairItem(
  repairID: string,
  currentLevelPos: number
): BaseRepairItem {
  if (isValidRepairLevelPos(repairID, currentLevelPos)) {
    return {
      repairID: repairID,
      currentLevelPos: currentLevelPos,
    };
  } else {
    throw new Error(
      `baseRepairItem.createBaseRepairItem ERROR: currentLevelPos (${currentLevelPos}) is invalid. RepairID: ${repairID}`
    );
  }
}
