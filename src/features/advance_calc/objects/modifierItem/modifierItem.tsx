import {
  BaseModifierItem,
  compareBaseModifierItem,
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

export function updateModifierItemInList(
  updatedModifierItem: ModifierItem,
  modifierItemList: ModifierItem[]
): ModifierItem[] {
  const modifierID = updatedModifierItem.modifierID;
  let isModifierFound = false;

  const updatedList = modifierItemList.map((modifier) => {
    if (modifier.modifierID === modifierID) {
      isModifierFound = true;
      return {
        ...updatedModifierItem,
      };
    }
    return modifier;
  });

  if (!isModifierFound) {
    throw new Error(
      `modifierItem.updateModifierItemInList ERROR: No modifier found with id ${modifierID}`
    );
  }

  return updatedList;
}

export function compareModifierItem(
  mo1: ModifierItem | undefined,
  mo2: ModifierItem | undefined
): boolean {
  if (mo1 === mo2) return true;
  if (!mo1 || !mo2) return false;

  return mo1.use === mo2.use && compareBaseModifierItem(mo1, mo2);
}
