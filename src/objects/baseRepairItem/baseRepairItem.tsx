import { isValidRepairLevelPos } from "utils/GameData/gameDataUtils";

export interface BaseRepairItem {
  id: string;
  repairID: string;
  currentLevelPos: number;
}

export function createBaseRepairItem(
  repairID: string,
  currentLevelPos: number
): BaseRepairItem {
  if (isValidRepairLevelPos(repairID, currentLevelPos)) {
    return {
      id: repairID,
      repairID: repairID,
      currentLevelPos: currentLevelPos,
    };
  } else {
    throw new Error(
      `baseRepairItem.createBaseRepairItem ERROR: currentLevelPos (${currentLevelPos}) is invalid. RepairID: ${repairID}`
    );
  }
}
