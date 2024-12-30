import { OFFENSE_TYPE } from "data/Game";
import { manageAdvanceCalcLevelPosGameDataLocalStorage } from "features/AdvanceCalculator/utils/LocalStorageData/manageAdvanceCalcLevelPosGameDataLocalStorage";
import { EquipmentItem } from "features/AdvanceCalculator/objects/equipmentItem";
import { manageAdvanceCalcUseGameDataLocalStorage } from "features/AdvanceCalculator/utils/LocalStorageData/manageAdvanceCalcUseGameDataLocalStorage";
import { initEquipmentItem } from "../initEquipmentItem";

const type = OFFENSE_TYPE.Equipment;
export function updateEquipmentItem(
  equipmentID: string,
  useHardMode: boolean,
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

  return initEquipmentItem(equipmentID, useHardMode);
}
