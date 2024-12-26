import {
  calculatePercentage,
  inverseScaleAndRoundValue,
  percentageToDecimal,
  roundToN,
  scaleAndRoundValue,
} from "utils/numberUtils";
import { ROUNDING_PRECISION } from "config/config";
import { HARD_MODE_HERO_DAMAGE_MODIFIER } from "data/game";

export function calculateDirectDamage(hp: number, damage: number): number {
  const remainingHP = hp - damage;
  return roundToN(remainingHP, ROUNDING_PRECISION);
}

export function calculateEarthquakeDamage(
  hp: number,
  maxHP: number,
  damage: number,
  earthquakeCount: number
) {
  if (earthquakeCount >= 0) {
    const maxEarthquakeDamage = calculatePercentage(
      maxHP,
      percentageToDecimal(damage)
    );
    const repeatedEarthquakeModifier = 1 / (2 * earthquakeCount + 1);
    const reducedEarthquakeDamage = calculatePercentage(
      maxEarthquakeDamage,
      repeatedEarthquakeModifier
    );

    const remainingHP = hp - reducedEarthquakeDamage;
    return roundToN(remainingHP, ROUNDING_PRECISION);
  } else {
    throw new Error(
      `gameDataUtils.calculateEarthquakeDamage ERROR: earthquakeCount (${earthquakeCount}) must be 0 or larger.`
    );
  }
}

export function calculateRepair(
  hp: number,
  maxHP: number,
  repair: number
): number {
  const remainingHP = roundToN(hp + repair, ROUNDING_PRECISION);

  return remainingHP < maxHP ? remainingHP : maxHP;
}

export function calculateModifiedValue(
  baseValue: number,
  modifyPercentage: number
) {
  const modifyDecimal = percentageToDecimal(modifyPercentage);

  return scaleAndRoundValue(baseValue, modifyDecimal, ROUNDING_PRECISION);
}

export function calculateModifiedAttackSpeed(
  baseAttackSpeed: number,
  attackSpeedModifyPercentage: number
) {
  const modifyDecimal = percentageToDecimal(attackSpeedModifyPercentage);

  return inverseScaleAndRoundValue(
    baseAttackSpeed,
    modifyDecimal,
    ROUNDING_PRECISION
  );
}

export function calculateDPSAfterAttackSpeedModified(
  dps: number,
  attackSpeedModifyPercentage: number
) {
  const modifyDecimal = percentageToDecimal(attackSpeedModifyPercentage);

  return scaleAndRoundValue(dps, modifyDecimal, ROUNDING_PRECISION);
}

export function calculateHeroHardModeDamage(damage: number) {
  return roundToN(damage * HARD_MODE_HERO_DAMAGE_MODIFIER, ROUNDING_PRECISION);
}

export function calculateDPH(dps: number, attackSpeed: number) {
  return roundToN(dps * attackSpeed, ROUNDING_PRECISION);
}
