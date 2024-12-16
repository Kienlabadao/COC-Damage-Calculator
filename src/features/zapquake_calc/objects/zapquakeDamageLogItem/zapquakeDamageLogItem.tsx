import {
  createDamageLogItem,
  DamageLogItem,
  DamageLogType,
} from "objects/damageLogItem";
import { ActionType } from "objects/actionItem";

export interface ZapquakeDamageLogItem extends DamageLogItem {
  isDonated: boolean;
}

export function createZapquakeDamageLogItem(
  actionID: string,
  type: ActionType,
  currentLevelPos: number,
  damage: number,
  damageLogType: DamageLogType,
  remainingHP: number,
  earthquakeCount: number,
  isDonated: boolean,
  modifierID?: string,
  modifiedDamage?: number,
  noHardModeDamage?: number,
  earthquakeReducedDamage?: number
): ZapquakeDamageLogItem {
  return {
    ...createDamageLogItem(
      actionID,
      type,
      currentLevelPos,
      damage,
      damageLogType,
      remainingHP,
      earthquakeCount,
      modifierID,
      modifiedDamage,
      noHardModeDamage,
      earthquakeReducedDamage
    ),
    isDonated: isDonated,
  };
}
