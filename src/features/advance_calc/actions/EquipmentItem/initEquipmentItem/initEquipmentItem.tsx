import { OFFENSE_TYPE } from "data/game";
import {
  createEquipmentItem,
  EquipmentItem,
} from "features/advance_calc/objects/equipmentItem";
import { manageAdvanceCalcLevelPosGameDataLocalStorage } from "features/advance_calc/utils/LocalStorageData/manageAdvanceCalcLevelPosGameDataLocalStorage";
import { manageAdvanceCalcUseGameDataLocalStorage } from "features/advance_calc/utils/LocalStorageData/manageAdvanceCalcUseGameDataLocalStorage";

const type = OFFENSE_TYPE.Equipment;

export function initEquipmentItem(equipmentID: string): EquipmentItem {
  const { getOrStoreLevelPos } = manageAdvanceCalcLevelPosGameDataLocalStorage(
    equipmentID,
    type
  );
  const currentLevelPos = getOrStoreLevelPos();

  const { getOrStoreUseOffense } = manageAdvanceCalcUseGameDataLocalStorage(
    equipmentID,
    type
  );
  const useEquipment = getOrStoreUseOffense();

  return createEquipmentItem(equipmentID, currentLevelPos, useEquipment);
}
