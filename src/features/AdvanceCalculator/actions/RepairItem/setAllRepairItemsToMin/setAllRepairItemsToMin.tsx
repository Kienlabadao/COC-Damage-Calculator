import { GAME_DATA_TYPE } from "data/game";
import { RepairItem } from "features/advance_calc/objects/repairItem";
import { manageAdvanceCalcLevelPosGameDataLocalStorage } from "features/advance_calc/utils/LocalStorageData/manageAdvanceCalcLevelPosGameDataLocalStorage";
import { getGameDataMinLevelPos } from "utils/GameData/gameDataUtils";
import { initRepairItem } from "../initRepairItem";

const type = GAME_DATA_TYPE.Repair;

export function setAllRepairItemsToMin(
  repairItemList: RepairItem[]
): RepairItem[] {
  return repairItemList.map((repair) => {
    const repairID = repair.repairID;
    const minLevelPos = getGameDataMinLevelPos(repairID, type);

    const { storeLevelPos } = manageAdvanceCalcLevelPosGameDataLocalStorage(
      repairID,
      type
    );
    storeLevelPos(minLevelPos);

    return initRepairItem(repairID);
  });
}
