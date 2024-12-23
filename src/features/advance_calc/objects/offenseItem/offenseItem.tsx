import { OffenseType } from "data/game";
import {
  BaseOffenseItem,
  compareBaseOffenseItem,
  createBaseOffenseItem,
} from "objects/baseOffenseItem";

export interface OffenseItem extends BaseOffenseItem {}

export function createOffenseItem(
  offenseID: string,
  type: OffenseType,
  currentLevelPos: number
): OffenseItem {
  return createBaseOffenseItem(offenseID, type, currentLevelPos);
}

export function updateOffenseItemInList(
  updatedOffenseItem: OffenseItem,
  offenseItemList: OffenseItem[]
): OffenseItem[] {
  const offenseID = updatedOffenseItem.offenseID;
  let isOffenseFound = false;

  const updatedList = offenseItemList.map((offense) => {
    if (offense.offenseID === offenseID) {
      isOffenseFound = true;
      return {
        ...updatedOffenseItem,
      };
    }
    return offense;
  });

  if (!isOffenseFound) {
    throw new Error(
      `offenseItem.updateOffenseItemInList ERROR: No offense found with id ${offenseID}`
    );
  }

  return updatedList;
}

export function filterOffenseItemList(
  offenseItemList: OffenseItem[],
  offenseTypeFilterList?: Set<OffenseType>
): OffenseItem[] {
  return offenseItemList.filter((offenseItem) => {
    if (!offenseTypeFilterList || offenseTypeFilterList.has(offenseItem.type)) {
      return true;
    }
    return false;
  });
}

export function compareOffenseItem(
  oF1: OffenseItem,
  oF2: OffenseItem
): boolean {
  return compareBaseOffenseItem(oF1, oF2);
}
