import { GAME_DATA_TYPE } from "data/Game";
import {
  createRepairItem,
  RepairItem,
} from "features/AdvanceCalculator/objects/repairItem";
import { manageAdvanceCalcLevelPosGameDataLocalStorage } from "features/AdvanceCalculator/utils/LocalStorageData/manageAdvanceCalcLevelPosGameDataLocalStorage";

export function initRepairItem(repairID: string): RepairItem {
  const { getOrStoreLevelPos } = manageAdvanceCalcLevelPosGameDataLocalStorage(
    repairID,
    GAME_DATA_TYPE.Repair
  );
  const currentLevelPos = getOrStoreLevelPos();

  return createRepairItem(repairID, currentLevelPos);
}
