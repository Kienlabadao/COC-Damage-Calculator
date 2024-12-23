import { ACTION_DAMAGE_TYPE, ActionItem } from "objects/actionItem";
import { DAMAGE_LOG_TYPE, DamageLogType } from "objects/damageLogItem";
import {
  calculateDirectDamage,
  calculateEarthquakeDamage,
  calculateRepair,
} from "utils/GameData/gameDataCalculatorUtils";

interface Result {
  damage: number;
  damageLogType: DamageLogType;
  earthquakeCount: number;
  earthquakeReducedDamage: number;
  remainingHP: number;
}

export function calculateDamage(
  action: ActionItem,
  currentHP: number,
  maxHP: number,
  earthquakeCount: number,
  isImmune: (offenseID: string) => boolean
): Result {
  const actionID = action.actionID;
  let remainingHP = currentHP;
  const damage = action.damage;
  let earthquakeReducedDamage = 0;

  if (!isImmune(actionID)) {
    switch (action.damageType) {
      case ACTION_DAMAGE_TYPE.Direct:
        remainingHP = calculateDirectDamage(currentHP, damage);

        return {
          damage,
          damageLogType: DAMAGE_LOG_TYPE.Attack,
          earthquakeCount,
          earthquakeReducedDamage,
          remainingHP,
        };
      case ACTION_DAMAGE_TYPE.Earthquake:
        remainingHP = calculateEarthquakeDamage(
          currentHP,
          maxHP,
          damage,
          earthquakeCount
        );

        if (earthquakeCount > 0) {
          earthquakeReducedDamage =
            currentHP - calculateEarthquakeDamage(currentHP, maxHP, damage, 0);
        }

        earthquakeCount++;
        return {
          damage: currentHP - remainingHP,
          damageLogType: DAMAGE_LOG_TYPE.Earthquake,
          earthquakeCount,
          earthquakeReducedDamage,
          remainingHP,
        };
      case ACTION_DAMAGE_TYPE.Repair:
        remainingHP = calculateRepair(currentHP, maxHP, damage);

        return {
          damage,
          damageLogType: DAMAGE_LOG_TYPE.Repair,
          earthquakeCount,
          earthquakeReducedDamage,
          remainingHP,
        };
      default:
        throw new Error(
          `gameDataCalculatorUtils.convertActionItem ERROR: DamageType is not supported.`
        );
    }
  } else {
    return {
      damage: 0,
      damageLogType: DAMAGE_LOG_TYPE.Immune,
      earthquakeCount,
      earthquakeReducedDamage,
      remainingHP,
    };
  }
}
