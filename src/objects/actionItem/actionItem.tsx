import { DAMAGE_TYPE, GAME_DATA_TYPE, OFFENSE_TYPE } from "data/game";
import { ObjectValues } from "utils/objectUtils";
import { isValidGameDataLevelPos } from "utils/GameData/gameDataUtils";
import { BaseOffenseItem } from "objects/baseOffenseItem";
import { BaseModifierItem } from "objects/baseModifierItem";

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
