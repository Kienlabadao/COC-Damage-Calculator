import { OffenseType } from "data/Game";
import {
  BaseOffenseItem,
  compareBaseOffenseItem,
  createBaseOffenseItem,
} from "objects/baseOffenseItem";

export interface OffenseItem extends BaseOffenseItem {
  use: boolean;
}

export function createOffenseItem(
  offenseID: string,
  type: OffenseType,
  currentLevelPos: number,
  use: boolean
): OffenseItem {
  return {
    ...createBaseOffenseItem(offenseID, type, currentLevelPos),
    use: use,
  };
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
  offenseTypeFilterList?: Set<OffenseType>,
  use?: boolean
): OffenseItem[] {
  return offenseItemList.filter((offenseItem) => {
    if (!offenseTypeFilterList || offenseTypeFilterList.has(offenseItem.type)) {
      return use !== undefined ? offenseItem.use === use : true;
    }
    return false;
  });
}

export function findOffenseItem(
  offenseItemList: OffenseItem[],
  offenseID: string
): OffenseItem | null {
  return (
    offenseItemList.find(
      (offenseItem) => offenseItem.offenseID === offenseID
    ) || null
  );
}

export function removeOffenseItem(
  offenseItemList: OffenseItem[],
  offenseID: string
): {
  removedOffenseItem: OffenseItem | null;
  newOffenseItemList: OffenseItem[];
} {
  if (offenseItemList.length === 0) {
    return { removedOffenseItem: null, newOffenseItemList: offenseItemList };
  }

  let removedOffenseItem: OffenseItem | null = null;
  const newOffenseItemList = offenseItemList.filter((offenseItem) => {
    if (offenseItem.offenseID === offenseID) {
      removedOffenseItem = offenseItem;
      return false; // Exclude the item to be removed
    }
    return true; // Keep other items
  });

  return { removedOffenseItem, newOffenseItemList };
}

export function compareOffenseItem(
  oF1: OffenseItem | undefined,
  oF2: OffenseItem | undefined
): boolean {
  if (oF1 === oF2) return true;
  if (!oF1 || !oF2) return false;

  return oF1.use === oF2.use && compareBaseOffenseItem(oF1, oF2);
}

export function compareOffenseItemList(
  oFItemList1: OffenseItem[] | undefined,
  oFItemList2: OffenseItem[] | undefined
): boolean {
  if (oFItemList1 === oFItemList2) return true;
  if (!oFItemList1 || !oFItemList2) return false;

  if (oFItemList1.length !== oFItemList2.length) {
    return false;
  }

  return oFItemList1.every((oF, index) =>
    compareOffenseItem(oF, oFItemList2[index])
  );
}
