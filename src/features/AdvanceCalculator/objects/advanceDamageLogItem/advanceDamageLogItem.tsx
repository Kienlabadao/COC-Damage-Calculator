import {
  createDamageLogItem,
  DamageLogItem,
  DamageLogType,
} from "objects/damageLogItem";
import { ActionType } from "objects/actionItem";
import { BaseModifierItem } from "objects/baseModifierItem";

export interface AdvanceDamageLogItem extends DamageLogItem {}

export function createAdvanceDamageLogItem(
  actionID: string,
  type: ActionType,
  currentLevelPos: number,
  damage: number,
  damageLogType: DamageLogType,
  remainingHP: number,
  earthquakeCount: number,
  activeBaseModifierItem?: BaseModifierItem,
  modifiedDamage?: number,
  noHardModeDamage?: number,
  earthquakeReducedDamage?: number
): AdvanceDamageLogItem {
  return {
    ...createDamageLogItem(
      actionID,
      type,
      currentLevelPos,
      damage,
      damageLogType,
      remainingHP,
      earthquakeCount,
      activeBaseModifierItem,
      modifiedDamage,
      noHardModeDamage,
      earthquakeReducedDamage
    ),
  };
}
