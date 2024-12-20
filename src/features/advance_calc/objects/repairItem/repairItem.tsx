import { BaseRepairItem, createBaseRepairItem } from "objects/baseRepairItem";

export interface RepairItem extends BaseRepairItem {
  use: boolean;
}

export function createRepairItem(
  repairID: string,
  currentLevelPos: number,
  use: boolean
): RepairItem {
  return {
    ...createBaseRepairItem(repairID, currentLevelPos),
    use: use,
  };
}
