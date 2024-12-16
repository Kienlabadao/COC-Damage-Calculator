import {
  calculateEquipmentDamage,
  calculateSpellDamage,
} from "actions/GameData";
import { ACTION_TYPE, ActionItem } from "objects/actionItem";
import { DamageLogItem } from "objects/damageLogItem";

export function convertActionItem(
  action: ActionItem,
  currentHP: number,
  maxHP: number,
  earthquakeCount: number,
  isImmune: (offenseID: string) => boolean
): DamageLogItem {
  switch (action.type) {
    case ACTION_TYPE.Equipment:
      return calculateEquipmentDamage(
        action,
        currentHP,
        maxHP,
        earthquakeCount,
        isImmune
      );
    case ACTION_TYPE.Hero:
      // TODO
      throw new Error(
        `damageLogItem.createDamageLogList ERROR: ActionType (${action.type}) is not supported.`
      );
    case ACTION_TYPE.Spell:
      return calculateSpellDamage(
        action,
        currentHP,
        maxHP,
        earthquakeCount,
        isImmune
      );
    case ACTION_TYPE.Troop:
      // TODO
      throw new Error(
        `damageLogItem.createDamageLogList ERROR: ActionType (${action.type}) is not supported.`
      );
    case ACTION_TYPE.Repair:
      // TODO
      throw new Error(
        `damageLogItem.createDamageLogList ERROR: ActionType (${action.type}) is not supported.`
      );
    default:
      throw new Error(
        `damageLogItem.createDamageLogList ERROR: ActionType (${action.type}) is not supported.`
      );
  }
}
