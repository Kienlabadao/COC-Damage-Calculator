import { calculateDamage } from "actions/ActionItem";
import { ActionItem } from "objects/actionItem";
import { createDamageLogItem, DamageLogItem } from "objects/damageLogItem";

export function convertActionItem(
  action: ActionItem,
  currentHP: number,
  maxHP: number,
  currentEarthquakeCount: number,
  isImmune: (offenseID: string) => boolean
): DamageLogItem {
  const {
    damage,
    damageLogType,
    earthquakeCount,
    earthquakeReducedDamage,
    remainingHP,
  } = calculateDamage(
    action,
    currentHP,
    maxHP,
    currentEarthquakeCount,
    isImmune
  );

  return createDamageLogItem(
    action.actionID,
    action.type,
    action.currentLevelPos,
    damage,
    damageLogType,
    remainingHP,
    earthquakeCount,
    action.activeBaseModifierItem,
    action.modifiedDamage,
    action.noHardModeDamage,
    earthquakeReducedDamage
  );
}
