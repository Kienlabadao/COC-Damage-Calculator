import {
  BaseModifierItem,
  createBaseModifierItem,
} from "objects/baseModifierItem";

export interface ModifierItem extends BaseModifierItem {
  use: boolean;
}

export function createModifierItem(
  modifierID: string,
  currentLevelPos: number,
  use: boolean
): ModifierItem {
  return {
    ...createBaseModifierItem(modifierID, currentLevelPos),
    use: use,
  };
}
