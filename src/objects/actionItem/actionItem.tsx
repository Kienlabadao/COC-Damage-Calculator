import { GAME_DATA_TYPE, OFFENSE_TYPE } from "data/game";
import { ObjectValues } from "utils/objectUtils";
import { isValidGameDataLevelPos } from "utils/GameData/gameDataUtils";
import { BaseOffenseItem } from "objects/baseOffenseItem";
import { BaseModifierItem } from "objects/baseModifierItem";

export const ACTION_TYPE = {
  ...OFFENSE_TYPE,
  Repair: GAME_DATA_TYPE.Repair,
} as const;

export type ActionType = ObjectValues<typeof ACTION_TYPE>;

export interface ActionItem {
  actionID: string;
  type: ActionType;
  currentLevelPos: number;
  baseOffenseItemList?: BaseOffenseItem[];
  baseModifierItemList?: BaseModifierItem[];
  hardModeEnable?: boolean;
  useHeroAbility?: boolean;
  useTroopDeathDamage?: boolean;
}

export function createActionItem(
  actionID: string,
  type: ActionType,
  currentLevelPos: number,
  baseOffenseItemList?: BaseOffenseItem[],
  baseModifierItemList?: BaseModifierItem[],
  hardModeEnable = false,
  useHeroAbility?: boolean,
  useTroopDeathDamage?: boolean
): ActionItem {
  if (isValidGameDataLevelPos(currentLevelPos, actionID, type)) {
    return {
      actionID: actionID,
      type: type,
      currentLevelPos: currentLevelPos,
      baseOffenseItemList: baseOffenseItemList,
      baseModifierItemList: baseModifierItemList,
      hardModeEnable: hardModeEnable,
      useHeroAbility: useHeroAbility,
      useTroopDeathDamage: useTroopDeathDamage,
    };
  } else {
    throw new Error(
      `actionItem.createActionItem ERROR: currentLevelPos (${currentLevelPos}) is invalid. ActionID: ${actionID}`
    );
  }
}
