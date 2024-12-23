import {
  ActionDamageType,
  ActionItem,
  ActionType,
  createActionItem,
} from "objects/actionItem";

export interface ZapquakeActionItem extends ActionItem {
  isDonated: boolean;
}

export function createZapquakeActionItem(
  actionID: string,
  type: ActionType,
  currentLevelPos: number,
  damage: number,
  damageType: ActionDamageType,
  isDonated = false
): ZapquakeActionItem {
  return {
    ...createActionItem(actionID, type, currentLevelPos, damage, damageType),
    isDonated,
  };
}
