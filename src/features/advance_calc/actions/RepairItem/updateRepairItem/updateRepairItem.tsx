import { GAME_DATA_TYPE } from "data/game";
import { RepairItem } from "features/advance_calc/objects/repairItem";
import { manageAdvanceCalcLevelPosGameDataLocalStorage } from "features/advance_calc/utils/LocalStorageData/manageAdvanceCalcLevelPosGameDataLocalStorage";
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
