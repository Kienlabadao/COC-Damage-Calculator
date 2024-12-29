import {
  ActionDamageType,
  ActionItem,
  ActionType,
  compareActionItem,
  createActionItem,
} from "objects/actionItem";
import { BaseModifierItem } from "objects/baseModifierItem";
import { BaseOffenseItem } from "objects/baseOffenseItem";

export interface AdvanceActionItem extends ActionItem {}

export function createAdvanceActionItem(
  actionID: string,
  type: ActionType,
  currentLevelPos: number,
  damage: number,
  damageType: ActionDamageType,
  modifiedDamage = 0,
  noHardModeDamage = 0,
  baseOffenseItemList?: BaseOffenseItem[],
  activeBaseModifierItem?: BaseModifierItem,
  useTroopDeathDamage?: boolean
): AdvanceActionItem {
  return {
    ...createActionItem(
      actionID,
      type,
      currentLevelPos,
      damage,
      damageType,
      modifiedDamage,
      noHardModeDamage,
      baseOffenseItemList,
      activeBaseModifierItem,
      useTroopDeathDamage
    ),
  };
}

export function compareAdvanceActionItem(
  aI1: AdvanceActionItem | undefined,
  aI2: AdvanceActionItem | undefined
): boolean {
  if (aI1 === aI2) return true;
  if (!aI1 || !aI2) return false;

  return compareActionItem(aI1, aI2);
}

export function compareAdvanceActionItemList(
  atList1: AdvanceActionItem[] | undefined,
  atList2: AdvanceActionItem[] | undefined
): boolean {
  if (atList1 === atList2) return true;
  if (!atList1 || !atList2) return false;

  if (atList1.length !== atList2.length) {
    return false;
  }

  return atList1.every((oF, index) =>
    compareAdvanceActionItem(oF, atList2[index])
  );
}
