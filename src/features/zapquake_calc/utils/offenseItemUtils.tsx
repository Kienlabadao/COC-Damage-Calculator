import { OffenseType } from "assets/data/game";
import { levelPosGameDataLocalStorageUtils } from "./LocalStorageData/levelPosGameDataLocalStorageUtils";

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

// export function setAllOffenseItemsToMax(
//   offenseItemList: OffenseItem[],
//   offenseTypeSearchList?: Set<OffenseType>
// ): OffenseItem[] {
//   return offenseItemList.map((offense) => {
//     if (offenseTypeSearchList && offenseTypeSearchList.size !== 0 && offenseTypeSearchList.has(offense.type)) {
//         const =
//       return {
//         ...offense,
//         currentLevelPos: offense.saveCurrentLevelPos(currentLevelPos),
//       };
//     }
//     return offense;
//   });
// }
