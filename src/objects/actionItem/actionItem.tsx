import { DAMAGE_TYPE, GAME_DATA_TYPE, OFFENSE_TYPE } from "data/game";
import { ObjectValues } from "utils/objectUtils";
import { isValidGameDataLevelPos } from "utils/GameData/gameDataUtils";
import {
  BaseOffenseItem,
  compareBaseOffenseItemList,
} from "objects/baseOffenseItem";
import {
  BaseModifierItem,
  compareBaseModifierItem,
} from "objects/baseModifierItem";

export const ACTION_TYPE = {
  ...OFFENSE_TYPE,
  Repair: GAME_DATA_TYPE.Repair,
} as const;
export type ActionType = ObjectValues<typeof ACTION_TYPE>;

export const ACTION_DAMAGE_TYPE = {
  ...DAMAGE_TYPE,
  Repair: "repair",
} as const;
export type ActionDamageType = ObjectValues<typeof ACTION_DAMAGE_TYPE>;

export interface ActionItem {
  actionID: string;
  type: ActionType;
  currentLevelPos: number;
  damage: number;
  modifiedDamage: number;
  noHardModeDamage: number;
  damageType: ActionDamageType;
  baseOffenseItemList?: BaseOffenseItem[];
  activeBaseModifierItem?: BaseModifierItem;
  useTroopDeathDamage?: boolean;
}

export function createActionItem(
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
): ActionItem {
  if (isValidGameDataLevelPos(currentLevelPos, actionID, type)) {
    return {
      actionID: actionID,
      type: type,
      currentLevelPos: currentLevelPos,
      damage: damage,
      modifiedDamage: modifiedDamage,
      noHardModeDamage: noHardModeDamage,
      damageType: damageType,
      baseOffenseItemList: baseOffenseItemList,
      activeBaseModifierItem: activeBaseModifierItem,
      useTroopDeathDamage: useTroopDeathDamage,
    };
  } else {
    throw new Error(
      `actionItem.createActionItem ERROR: currentLevelPos (${currentLevelPos}) is invalid. ActionID: ${actionID}`
    );
  }
}

export function compareActionItem(
  aI1: ActionItem | undefined,
  aI2: ActionItem | undefined
): boolean {
  if (aI1 === aI2) return true;
  if (!aI1 || !aI2) return false;

  if (
    aI1.actionID !== aI2.actionID ||
    aI1.type !== aI2.type ||
    aI1.currentLevelPos !== aI2.currentLevelPos ||
    aI1.damage !== aI2.damage ||
    aI1.modifiedDamage !== aI2.modifiedDamage ||
    aI1.noHardModeDamage !== aI2.noHardModeDamage ||
    aI1.useTroopDeathDamage !== aI2.useTroopDeathDamage ||
    aI1.damageType !== aI2.damageType
  ) {
    return false;
  }

  if (
    !compareBaseOffenseItemList(
      aI1.baseOffenseItemList,
      aI2.baseOffenseItemList
    ) ||
    !compareBaseModifierItem(
      aI1.activeBaseModifierItem,
      aI2.activeBaseModifierItem
    )
  ) {
    return false;
  }

  return true;
}
