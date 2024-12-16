import { ObjectValues } from "utils/objectUtils";
import { isValidGameDataLevelPos } from "utils/GameData/gameDataUtils";
import { ActionType } from "objects/actionItem";

export const DAMAGE_LOG_TYPE = {
  Attack: "attack",
  Earthquake: "earthquake",
  Repair: "repair",
  Immune: "immune",
} as const;

export type DamageLogType = ObjectValues<typeof DAMAGE_LOG_TYPE>;

export interface DamageLogItem {
  actionID: string;
  type: ActionType;
  currentLevelPos: number;
  damage: number;
  damageLogType: DamageLogType;
  remainingHP: number;
  earthquakeCount: number;
  modifierID?: string;
  modifiedDamage?: number;
  noHardModeDamage?: number;
  earthquakeReducedDamage?: number;
}

export function createDamageLogItem(
  actionID: string,
  type: ActionType,
  currentLevelPos: number,
  damage: number,
  damageLogType: DamageLogType,
  remainingHP: number,
  earthquakeCount: number,
  modifierID?: string,
  modifiedDamage?: number,
  noHardModeDamage?: number,
  earthquakeReducedDamage?: number
): DamageLogItem {
  if (isValidGameDataLevelPos(currentLevelPos, actionID, type)) {
    return {
      actionID: actionID,
      type: type,
      currentLevelPos: currentLevelPos,
      damage: damage,
      damageLogType: damageLogType,
      remainingHP: remainingHP,
      earthquakeCount: earthquakeCount,
      modifierID: modifierID,
      modifiedDamage: modifiedDamage,
      noHardModeDamage: noHardModeDamage,
      earthquakeReducedDamage: earthquakeReducedDamage,
    };
  } else {
    throw new Error(
      `damageLogItem.createDamageLogItem ERROR: currentLevelPos (${currentLevelPos}) is invalid. ActionID: ${actionID}`
    );
  }
}
