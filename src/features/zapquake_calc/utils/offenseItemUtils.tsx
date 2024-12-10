import { OffenseType } from "assets/data/game";
import { levelPosGameDataLocalStorageUtils } from "./LocalStorageData/levelPosGameDataLocalStorageUtils";
import {
  getGameDataMaxLevelPos,
  getGameDataMinLevelPos,
} from "utils/GameData/gameDataUtils";

export interface OffenseItem {
  id: string;
  type: OffenseType;
  currentLevelPos: number;
  saveCurrentLevelPos: (newCurrentLevelPos: number) => number;
}

export function createOffenseItem(
  offenseID: string,
  type: OffenseType
): OffenseItem {
  const { getOrStoreLevelPos, storeLevelPos } =
    levelPosGameDataLocalStorageUtils(offenseID, type);
  const currentLevelPos = getOrStoreLevelPos();

  return {
    id: offenseID,
    type: type,
    currentLevelPos: currentLevelPos,
    saveCurrentLevelPos: (newCurrentLevelPos: number): number => {
      storeLevelPos(newCurrentLevelPos);
      return getOrStoreLevelPos();
    },
  };
}

export function updateOffenseItemInList(
  offenseItemList: OffenseItem[],
  offenseID: string,
  currentLevelPos: number
): OffenseItem[] {
  let isOffenseFound = false;

  const updatedList = offenseItemList.map((offense) => {
    if (offense.id === offenseID) {
      isOffenseFound = true;
      return {
        ...offense,
        currentLevelPos: offense.saveCurrentLevelPos(currentLevelPos),
      };
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
