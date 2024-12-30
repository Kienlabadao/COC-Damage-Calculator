import { manageAdvanceCalcLevelPosGameDataLocalStorage } from "features/AdvanceCalculator/utils/LocalStorageData/manageAdvanceCalcLevelPosGameDataLocalStorage";
import { getGameDataMinLevelPos } from "utils/GameData/gameDataUtils";
import { initEquipmentItem } from "../initEquipmentItem";
import { EquipmentItem } from "features/AdvanceCalculator/objects/equipmentItem";

export function setAllEquipmentItemsToMin(
  equipmentItemList: EquipmentItem[],
  useHardMode: boolean
): EquipmentItem[] {
  return equipmentItemList.map((equipment) => {
    const equipmentID = equipment.offenseID;
    const type = equipment.type;
    const minLevelPos = getGameDataMinLevelPos(equipmentID, type);

    const { storeLevelPos } = manageAdvanceCalcLevelPosGameDataLocalStorage(
      equipmentID,
      type
    );
    storeLevelPos(minLevelPos);

    return initEquipmentItem(equipmentID, useHardMode);
  });
}
