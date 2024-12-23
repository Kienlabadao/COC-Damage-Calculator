import {
  calculatePercentage,
  percentageToDecimal,
  roundToN,
  scaleAndRoundValue,
} from "utils/numberUtils";
import { ROUNDING_PRECISION } from "config/config";

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
