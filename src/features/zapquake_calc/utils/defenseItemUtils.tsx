import { GAME_DATA_TYPE } from "data/game";
import {
  getGameDataMaxLevelPos,
  getGameDataMinLevelPos,
} from "utils/GameData/gameDataUtils";
import { manageZapquakeCalcLevelPosGameDataLocalStorage } from "./LocalStorageData/manageZapquakeCalcLevelPosGameDataLocalStorage";

const type = GAME_DATA_TYPE.Defense;

export interface DefenseItem {
  id: string;
  defenseID: string;
  currentLevelPos: number;
  saveCurrentLevelPos: (newCurrentLevelPos: number) => number;
}

export function createDefenseItem(defenseID: string): DefenseItem {
  const { getOrStoreLevelPos, storeLevelPos } =
    manageZapquakeCalcLevelPosGameDataLocalStorage(defenseID, type);
  const currentLevelPos = getOrStoreLevelPos();

  return {
    id: defenseID,
    defenseID: defenseID,
    currentLevelPos: currentLevelPos,
    saveCurrentLevelPos: (newCurrentLevelPos: number): number => {
      storeLevelPos(newCurrentLevelPos);
      return getOrStoreLevelPos();
    },
  };
}

export function updateDefenseItemInList(
  defenseItemList: DefenseItem[],
  defenseID: string,
  currentLevelPos: number
): DefenseItem[] {
  let isDefenseFound = false;

  const updatedList = defenseItemList.map((defense) => {
    if (defense.id === defenseID) {
      isDefenseFound = true;
      return {
        ...defense,
        currentLevelPos: defense.saveCurrentLevelPos(currentLevelPos),
      };
    }
    return defense;
  });

  if (!isDefenseFound) {
    throw new Error(
      `useInitDefense.updateDefenseItemInList ERROR: No defense found with id ${defenseID}`
    );
  }

  return updatedList;
}

export function setAllDefenseItemsToMax(
  defenseItemList: DefenseItem[]
): DefenseItem[] {
  return defenseItemList.map((defense) => {
    const maxLevelPos = getGameDataMaxLevelPos(defense.defenseID, type);

    return {
      ...defense,
      currentLevelPos: defense.saveCurrentLevelPos(maxLevelPos),
    };
  });
}

export function setAllDefenseItemsToMin(
  defenseItemList: DefenseItem[]
): DefenseItem[] {
  return defenseItemList.map((defense) => {
    const minLevelPos = getGameDataMinLevelPos(defense.defenseID, type);

    return {
      ...defense,
      currentLevelPos: defense.saveCurrentLevelPos(minLevelPos),
    };
  });
}
