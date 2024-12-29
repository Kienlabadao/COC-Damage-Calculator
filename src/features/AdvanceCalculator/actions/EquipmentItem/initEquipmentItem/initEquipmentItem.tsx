import { OFFENSE_TYPE } from "data/game";
import {
  createEquipmentItem,
  EquipmentItem,
} from "features/advance_calc/objects/equipmentItem";
import { manageAdvanceCalcLevelPosGameDataLocalStorage } from "features/advance_calc/utils/LocalStorageData/manageAdvanceCalcLevelPosGameDataLocalStorage";
import { manageAdvanceCalcUseGameDataLocalStorage } from "features/advance_calc/utils/LocalStorageData/manageAdvanceCalcUseGameDataLocalStorage";
import { equipmentDataUtils } from "utils/GameData/equipmentDataUtils";

const type = OFFENSE_TYPE.Equipment;

function setCurrentLevelPos(equipmentID: string, useHardMode: boolean): number {
  const { getOrStoreLevelPos, storeLevelPos } =
    manageAdvanceCalcLevelPosGameDataLocalStorage(equipmentID, type);
  const currentLevelPos = getOrStoreLevelPos();

  const { getEquipmentMaxLevelPos } = equipmentDataUtils(equipmentID);
  const maxLevelPos = getEquipmentMaxLevelPos(useHardMode);

  if (maxLevelPos < currentLevelPos) {
    storeLevelPos(maxLevelPos);

    return getOrStoreLevelPos();
  } else {
    return currentLevelPos;
  }
}

export function initEquipmentItem(
  equipmentID: string,
  useHardMode: boolean
): EquipmentItem {
  const currentLevelPos = setCurrentLevelPos(equipmentID, useHardMode);

  const { getOrStoreUseOffense } = manageAdvanceCalcUseGameDataLocalStorage(
    equipmentID,
    type
  );
  const useEquipment = getOrStoreUseOffense();

  return createEquipmentItem(equipmentID, currentLevelPos, useEquipment);
}
