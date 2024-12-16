import { ACTION_TYPE, ActionItem } from "objects/actionItem";
import {
  createDamageLogItem,
  DAMAGE_LOG_TYPE,
  DamageLogItem,
  DamageLogType,
} from "objects/damageLogItem";
import { spellDataUtils } from "utils/GameData/spellDataUtils";
import {
  calculateDirectDamage,
  calculateEarthquakeDamage,
} from "utils/GameData/gameDataUtils";

export function calculateSpellDamage(
  action: ActionItem,
  currentHP: number,
  maxHP: number,
  earthquakeCount: number,
  isImmune: (offenseID: string) => boolean
): DamageLogItem {
  const spellID = action.actionID;
  const {
    getSpellDamage,
    isSpellDamageTypeDirect,
    isSpellDamageTypeEarthquake,
  } = spellDataUtils(action.actionID);
  const type = ACTION_TYPE.Spell;
  const spellCurrentLevelPos = action.currentLevelPos;
  let damage = 0;
  let damageLogType: DamageLogType = DAMAGE_LOG_TYPE.Immune;
  let earthquakeReducedDamage: number | undefined;

  if (!isImmune(spellID)) {
    damage = getSpellDamage(spellCurrentLevelPos);

    if (isSpellDamageTypeDirect()) {
      currentHP = calculateDirectDamage(currentHP, damage);
      damageLogType = DAMAGE_LOG_TYPE.Attack;
    } else if (isSpellDamageTypeEarthquake()) {
      currentHP = calculateEarthquakeDamage(
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
      damageLogType = DAMAGE_LOG_TYPE.Earthquake;
    } else {
      throw new Error(
        `gameDataCalculatorUtils.calculateSpellDamage ERROR: DamageType is not supported.`
      );
    }
  }

  return createDamageLogItem(
    spellID,
    type,
    spellCurrentLevelPos,
    damage,
    damageLogType,
    currentHP,
    earthquakeCount,
    undefined,
    undefined,
    undefined,
    earthquakeReducedDamage
  );
}
