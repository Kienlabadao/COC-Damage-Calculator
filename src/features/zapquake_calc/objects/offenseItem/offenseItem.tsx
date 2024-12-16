import { OffenseType } from "data/game";
import { manageZapquakeCalcLevelPosGameDataLocalStorage } from "features/zapquake_calc/utils/LocalStorageData/manageZapquakeCalcLevelPosGameDataLocalStorage";
import { manageZapquakeCalcUseOffenseLocalStorage } from "features/zapquake_calc/utils/LocalStorageData/manageZapquakeCalcUseOffenseLocalStorage";
import { BaseOffenseItem } from "objects/baseOffenseItem";
import {
  getGameDataMaxLevelPos,
  getGameDataMinLevelPos,
} from "utils/GameData/gameDataUtils";

export interface OffenseItem extends BaseOffenseItem {
  id: string;
  use: boolean;
  saveCurrentLevelPos: (newCurrentLevelPos: number) => number;
  saveUseOffense: (newUseOffense: boolean) => boolean;
}

export function createOffenseItem(
  offenseID: string,
  type: OffenseType,
  isDonated: boolean = false
): OffenseItem {
  const { getOrStoreLevelPos, storeLevelPos } =
    manageZapquakeCalcLevelPosGameDataLocalStorage(offenseID, type, isDonated);
  const { getOrStoreUseOffense, storeUseOffense } =
    manageZapquakeCalcUseOffenseLocalStorage(offenseID, type, isDonated);
  const currentLevelPos = getOrStoreLevelPos();
  const useOffense = getOrStoreUseOffense();

  return {
    id: offenseID,
    offenseID: offenseID,
    type: type,
    currentLevelPos: currentLevelPos,
    use: useOffense,
    saveCurrentLevelPos: (newCurrentLevelPos: number): number => {
      storeLevelPos(newCurrentLevelPos);
      return getOrStoreLevelPos();
    },
    saveUseOffense: (newUseOffense: boolean): boolean => {
      storeUseOffense(newUseOffense);
      return getOrStoreUseOffense();
    },
  };
}

export function updateOffenseItemInList(
  offenseItemList: OffenseItem[],
  offenseID: string,
  currentLevelPos?: number,
  useOffense?: boolean
): OffenseItem[] {
  let isOffenseFound = false;

  const updatedList = offenseItemList.map((offense) => {
    if (offense.id === offenseID) {
      isOffenseFound = true;
      const updatedOffense = { ...offense };

      if (currentLevelPos !== undefined) {
        updatedOffense.currentLevelPos =
          offense.saveCurrentLevelPos(currentLevelPos);
      }

      if (useOffense !== undefined) {
        updatedOffense.use = offense.saveUseOffense(useOffense);
      }

      return updatedOffense;
    }
    return offense;
  });

  if (!isOffenseFound) {
    throw new Error(
      `useInitOffense.updateOffenseItemInList ERROR: No offense found with id ${offenseID}`
    );
  }

  return updatedList;
}

export function setAllOffenseItemsToMax(
  offenseItemList: OffenseItem[],
  offenseTypeFilterList?: Set<OffenseType>
): OffenseItem[] {
  return offenseItemList.map((offense) => {
    if (
      offenseTypeFilterList &&
      offenseTypeFilterList.size !== 0 &&
      offenseTypeFilterList.has(offense.type)
    ) {
      const maxLevelPos = getGameDataMaxLevelPos(
        offense.offenseID,
        offense.type
      );

      return {
        ...offense,
        currentLevelPos: offense.saveCurrentLevelPos(maxLevelPos),
      };
    }
    return offense;
  });
}

export function setAllOffenseItemsToMin(
  offenseItemList: OffenseItem[],
  offenseTypeFilterList?: Set<OffenseType>
): OffenseItem[] {
  return offenseItemList.map((offense) => {
    if (
      offenseTypeFilterList &&
      offenseTypeFilterList.size !== 0 &&
      offenseTypeFilterList.has(offense.type)
    ) {
      const minLevelPos = getGameDataMinLevelPos(
        offense.offenseID,
        offense.type
      );

      return {
        ...offense,
        currentLevelPos: offense.saveCurrentLevelPos(minLevelPos),
      };
    }
    return offense;
  });
}

export function filterOffenseItemList(
  offenseItemList: OffenseItem[],
  offenseTypeFilterList: Set<OffenseType>,
  use?: boolean
): OffenseItem[] {
  return offenseItemList.filter((offenseItem) => {
    if (offenseTypeFilterList.has(offenseItem.type)) {
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
