import { GAME_DATA_TYPE } from "data/Game";
import { RepairItem } from "features/AdvanceCalculator/objects/repairItem";
import { manageAdvanceCalcLevelPosGameDataLocalStorage } from "features/AdvanceCalculator/utils/LocalStorageData/manageAdvanceCalcLevelPosGameDataLocalStorage";
import { initRepairItem } from "../initRepairItem";

export function updateRepairItem(
  repairID: string,
  newCurrentLevelPos?: number
): RepairItem {
  if (newCurrentLevelPos !== undefined) {
    const { storeLevelPos } = manageAdvanceCalcLevelPosGameDataLocalStorage(
      repairID,
      GAME_DATA_TYPE.Repair
    );
    storeLevelPos(newCurrentLevelPos);
  }

  return initRepairItem(repairID);
}
