import { ActionItem, ActionType, createActionItem } from "objects/actionItem";

export interface AdvanceActionItem extends ActionItem {}

export function createAdvanceActionItem(
  actionID: string,
  type: ActionType,
  currentLevelPos: number
): AdvanceActionItem {
  return {
    ...createActionItem(actionID, type, currentLevelPos),
  };
}
