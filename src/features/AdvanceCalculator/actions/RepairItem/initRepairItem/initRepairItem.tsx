import { GAME_DATA_TYPE } from "data/game";
import {
  createRepairItem,
  RepairItem,
} from "features/advance_calc/objects/repairItem";
import { manageAdvanceCalcLevelPosGameDataLocalStorage } from "features/advance_calc/utils/LocalStorageData/manageAdvanceCalcLevelPosGameDataLocalStorage";

export function initRepairItem(repairID: string): RepairItem {
  const { getOrStoreLevelPos } = manageAdvanceCalcLevelPosGameDataLocalStorage(
    repairID,
    GAME_DATA_TYPE.Repair
  );
  const currentLevelPos = getOrStoreLevelPos();

  return createRepairItem(repairID, currentLevelPos);
}
