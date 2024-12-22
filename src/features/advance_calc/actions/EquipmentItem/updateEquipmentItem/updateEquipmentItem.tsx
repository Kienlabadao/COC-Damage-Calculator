import { OFFENSE_TYPE } from "data/game";
import { manageAdvanceCalcLevelPosGameDataLocalStorage } from "features/advance_calc/utils/LocalStorageData/manageAdvanceCalcLevelPosGameDataLocalStorage";
import { EquipmentItem } from "features/advance_calc/objects/equipmentItem";
import { manageAdvanceCalcUseGameDataLocalStorage } from "features/advance_calc/utils/LocalStorageData/manageAdvanceCalcUseGameDataLocalStorage";
import { initEquipmentItem } from "../initEquipmentItem";

const type = OFFENSE_TYPE.Equipment;
export function updateEquipmentItem(
  equipmentID: string,
  newCurrentLevelPos?: number,
  use?: boolean
): EquipmentItem {
  if (newCurrentLevelPos !== undefined) {
    const { storeLevelPos } = manageAdvanceCalcLevelPosGameDataLocalStorage(
      equipmentID,
      type
    );
    storeLevelPos(newCurrentLevelPos);
  }

  if (use !== undefined) {
    const { storeUseOffense } = manageAdvanceCalcUseGameDataLocalStorage(
      equipmentID,
      type
    );
    storeUseOffense(use);
  }

  return initEquipmentItem(equipmentID);
}
