import {
  BaseDefenseItem,
  compareBaseDefenseItem,
  createBaseDefenseItem,
} from "objects/baseDefenseItem";

export interface DefenseItem extends BaseDefenseItem {}

export function createDefenseItem(
  defenseID: string,
  currentLevelPos: number
): DefenseItem {
  return createBaseDefenseItem(defenseID, currentLevelPos);
}

export function updateDefenseItemInList(
  updatedDefenseItem: DefenseItem,
  defenseItemList: DefenseItem[]
): DefenseItem[] {
  const defenseID = updatedDefenseItem.defenseID;
  let isDefenseFound = false;

  const updatedList = defenseItemList.map((defense) => {
    if (defense.defenseID === defenseID) {
      isDefenseFound = true;
      return {
        ...updatedDefenseItem,
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

export function compareDefenseItem(
  df1: DefenseItem,
  df2: DefenseItem
): boolean {
  return compareBaseDefenseItem(df1, df2);
}
