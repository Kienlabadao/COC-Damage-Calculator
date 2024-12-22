import { BaseRepairItem, createBaseRepairItem } from "objects/baseRepairItem";

export interface RepairItem extends BaseRepairItem {}

export function createRepairItem(
  repairID: string,
  currentLevelPos: number
): RepairItem {
  return {
    ...createBaseRepairItem(repairID, currentLevelPos),
  };
}

export function updateRepairItemInList(
  updatedRepairItem: RepairItem,
  repairItemList: RepairItem[]
): RepairItem[] {
  const repairID = updatedRepairItem.repairID;
  let isRepairFound = false;

  const updatedList = repairItemList.map((repair) => {
    if (repair.repairID === repairID) {
      isRepairFound = true;
      return {
        ...updatedRepairItem,
      };
    }
    return repair;
  });

  if (!isRepairFound) {
    throw new Error(
      `repairItem.updateRepairItemInList ERROR: No repair found with id ${repairID}`
    );
  }

  return updatedList;
}
