import { ActionItem, ActionType, createActionItem } from "objects/actionItem";

export interface ZapquakeActionItem extends ActionItem {
  isDonated: boolean;
}

export function createZapquakeActionItem(
  actionID: string,
  type: ActionType,
  currentLevelPos: number,
  isDonated = false
): ZapquakeActionItem {
  return {
    ...createActionItem(actionID, type, currentLevelPos),
    isDonated,
  };
}
