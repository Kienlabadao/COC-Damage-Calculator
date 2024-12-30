import { GAME_DATA_TYPE } from "data/Game";
import { RepairItem } from "features/AdvanceCalculator/objects/repairItem";
import { manageAdvanceCalcLevelPosGameDataLocalStorage } from "features/AdvanceCalculator/utils/LocalStorageData/manageAdvanceCalcLevelPosGameDataLocalStorage";
import { getGameDataMaxLevelPos } from "utils/GameData/gameDataUtils";
import { initRepairItem } from "../initRepairItem";

const type = GAME_DATA_TYPE.Repair;

export function setAllRepairItemsToMax(
  repairItemList: RepairItem[]
): RepairItem[] {
  return repairItemList.map((repair) => {
    const repairID = repair.repairID;
    const maxLevelPos = getGameDataMaxLevelPos(repairID, type);

    const { storeLevelPos } = manageAdvanceCalcLevelPosGameDataLocalStorage(
      repairID,
      type
    );
    storeLevelPos(maxLevelPos);

    return initRepairItem(repairID);
  });
}
