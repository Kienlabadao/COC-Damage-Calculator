import { OFFENSE_TYPE } from "data/game";
import { createOffenseItem, OffenseItem } from "../offenseItem";

export interface EquipmentItem extends OffenseItem {
  use: boolean;
}

export function createEquipmentItem(
  offenseID: string,
  currentLevelPos: number,
  use: boolean
): EquipmentItem {
  return {
    ...createOffenseItem(offenseID, OFFENSE_TYPE.Equipment, currentLevelPos),
    use: use,
  };
}

export function updateEquipmentItemInList(
  updatedEquipmentItem: EquipmentItem,
  equipmentItemList: EquipmentItem[]
): EquipmentItem[] {
  const equipmentID = updatedEquipmentItem.offenseID;
  let isEquipmentFound = false;

  const updatedList = equipmentItemList.map((equipment) => {
    if (equipment.offenseID === equipmentID) {
      isEquipmentFound = true;
      return {
        ...updatedEquipmentItem,
      };
    }
    return equipment;
  });

  if (!isEquipmentFound) {
    throw new Error(
      `equipmentItem.updateEquipmentItemInList ERROR: No offense found with id ${equipmentID}`
    );
  }

  return updatedList;
}
