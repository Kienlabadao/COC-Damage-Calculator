import { OffenseType } from "data/game";
import {
  getGameDataMaxLevelPos,
  getGameDataMinLevelPos,
} from "utils/GameData/gameDataUtils";
import { manageZapquakeCalcLevelPosGameDataLocalStorage } from "./LocalStorageData/manageZapquakeCalcLevelPosGameDataLocalStorage";
import { manageZapquakeCalcUseOffenseLocalStorage } from "./LocalStorageData/manageZapquakeCalcUseOffenseLocalStorage";

export interface OffenseItem {
  id: string;
  offenseID: string;
  type: OffenseType;
  currentLevelPos: number;
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
      `useInitOffense.updateOffenseItemList ERROR: No offense found with id ${offenseID}`
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
