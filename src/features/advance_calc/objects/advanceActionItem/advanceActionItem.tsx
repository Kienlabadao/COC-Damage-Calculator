import {
  ActionDamageType,
  ActionItem,
  ActionType,
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
