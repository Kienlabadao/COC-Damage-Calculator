import { OffenseType } from "assets/data/game";
import { levelPosGameDataLocalStorageUtils } from "./LocalStorageData/levelPosGameDataLocalStorageUtils";
import {
  getGameDataMaxLevelPos,
  getGameDataMinLevelPos,
} from "utils/GameData/gameDataUtils";
import { useOffenseLocalStorageUtils } from "./LocalStorageData/useOffenseLocalStorageUtils";

export interface OffenseItem {
  id: string;
  type: OffenseType;
  currentLevelPos: number;
  use: boolean;
  saveCurrentLevelPos: (newCurrentLevelPos: number) => number;
  saveUseOffense: (newUseOffense: boolean) => boolean;
}

export function createOffenseItem(
  offenseID: string,
  type: OffenseType
): OffenseItem {
  const { getOrStoreLevelPos, storeLevelPos } =
    levelPosGameDataLocalStorageUtils(offenseID, type);
  const { getOrStoreUseOffense, storeUseOffense } = useOffenseLocalStorageUtils(
    offenseID,
    type
  );
  const currentLevelPos = getOrStoreLevelPos();
  const useOffense = getOrStoreUseOffense();

  return {
    id: offenseID,
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
      const maxLevelPos = getGameDataMaxLevelPos(offense.id, offense.type);

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
      const minLevelPos = getGameDataMinLevelPos(offense.id, offense.type);

      return {
        ...offense,
        currentLevelPos: offense.saveCurrentLevelPos(minLevelPos),
      };
    }
    return offense;
  });
}
