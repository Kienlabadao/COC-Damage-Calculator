import { initEquipmentItem } from "../initEquipmentItem";
import { EquipmentItem } from "features/AdvanceCalculator/objects/equipmentItem";
import { manageAdvanceCalcUseGameDataLocalStorage } from "features/AdvanceCalculator/utils/LocalStorageData/manageAdvanceCalcUseGameDataLocalStorage";

export function setAllEquipmentItemsToUnuse(
  equipmentItemList: EquipmentItem[],
  useHardMode: boolean
): EquipmentItem[] {
  return equipmentItemList.map((equipment) => {
    const equipmentID = equipment.offenseID;
    const type = equipment.type;

    const { storeUseOffense } = manageAdvanceCalcUseGameDataLocalStorage(
      equipmentID,
      type
    );
    storeUseOffense(false);

    return initEquipmentItem(equipmentID, useHardMode);
  });
}
