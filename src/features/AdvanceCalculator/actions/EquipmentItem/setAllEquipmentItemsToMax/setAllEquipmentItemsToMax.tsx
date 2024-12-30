import { manageAdvanceCalcLevelPosGameDataLocalStorage } from "features/AdvanceCalculator/utils/LocalStorageData/manageAdvanceCalcLevelPosGameDataLocalStorage";
import { getGameDataMaxLevelPos } from "utils/GameData/gameDataUtils";
import { initEquipmentItem } from "../initEquipmentItem";
import { EquipmentItem } from "features/AdvanceCalculator/objects/equipmentItem";

export function setAllEquipmentItemsToMax(
  equipmentItemList: EquipmentItem[],
  useHardMode: boolean
): EquipmentItem[] {
  return equipmentItemList.map((equipment) => {
    const equipmentID = equipment.offenseID;
    const type = equipment.type;
    const maxLevelPos = getGameDataMaxLevelPos(equipmentID, type);

    const { storeLevelPos } = manageAdvanceCalcLevelPosGameDataLocalStorage(
      equipmentID,
      type
    );
    storeLevelPos(maxLevelPos);

    return initEquipmentItem(equipmentID, useHardMode);
  });
}
