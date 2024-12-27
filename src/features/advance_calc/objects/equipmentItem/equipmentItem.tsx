import { OFFENSE_TYPE } from "data/game";
import {
  compareOffenseItem,
  createOffenseItem,
  OffenseItem,
} from "../offenseItem";
import { equipmentDataUtils } from "utils/GameData/equipmentDataUtils";

export interface EquipmentItem extends OffenseItem {
  use: boolean;
}

export function createEquipmentItem(
  equipmentID: string,
  currentLevelPos: number,
  use: boolean
): EquipmentItem {
  return {
    ...createOffenseItem(equipmentID, OFFENSE_TYPE.Equipment, currentLevelPos),
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

export function filterEquipmentItemList(
  equipmentItemList: EquipmentItem[],
  use?: boolean
): EquipmentItem[] {
  return equipmentItemList.filter((equipmentItem) => {
    if (use === undefined || equipmentItem.use === use) {
      return true;
    }
    return false;
  });
}

export function compareEquipmentItem(
  eT1: EquipmentItem | undefined,
  eT2: EquipmentItem | undefined
): boolean {
  if (eT1 === eT2) return true;
  if (!eT1 || !eT2) return false;

  return eT1.use === eT2.use && compareOffenseItem(eT1, eT2);
}

export function getEquipmentImage(equipmentItem: EquipmentItem) {
  const { getEquipmentImage } = equipmentDataUtils(equipmentItem.offenseID);

  return getEquipmentImage();
}
