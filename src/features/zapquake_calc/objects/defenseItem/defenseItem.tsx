import { SpellCountItem } from "../spellCountItem";
import { ObjectValues } from "utils/objectUtils";
import {
  BaseDefenseItem,
  createBaseDefenseItem,
} from "objects/baseDefenseItem";

export const DEFENSE_STATUS = {
  Normal: "normal",
  EquipmentDestroyed: "equipment_destroyed",
  ImpossibleDestroy: "Impossible_destroy",
} as const;

export type DefenseStatus = ObjectValues<typeof DEFENSE_STATUS>;

export interface DefenseItem extends BaseDefenseItem {
  defenseStatus: DefenseStatus;
  spellCountList: SpellCountItem[][];
}

export function createDefenseItem(
  defenseID: string,
  currentLevelPos: number,
  defenseStatus: DefenseStatus,
  spellCountList: SpellCountItem[][]
): DefenseItem {
  return {
    ...createBaseDefenseItem(defenseID, currentLevelPos),
    defenseStatus: defenseStatus,
    spellCountList: spellCountList,
  };
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
