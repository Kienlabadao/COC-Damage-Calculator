import { initEquipmentItem } from "../initEquipmentItem";
import { EquipmentItem } from "features/advance_calc/objects/equipmentItem";
import { manageAdvanceCalcUseGameDataLocalStorage } from "features/advance_calc/utils/LocalStorageData/manageAdvanceCalcUseGameDataLocalStorage";

export function setAllEquipmentItemsToUse(
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
    storeUseOffense(true);

    return initEquipmentItem(equipmentID, useHardMode);
  });
}
