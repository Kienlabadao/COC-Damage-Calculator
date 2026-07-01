import {
  normalizeOffenseDamageData,
  validateOffenseEntityData,
} from "../../../shared/offense/offenseData.util";
import { type DamageType } from "../../../shared/offense/damageType";
import {
  type OffenseOnlyTroopLevelData,
  type OffenseOnlyTroopRawLevelData,
  type OffenseOnlyTroopData,
} from "./offenseOnlyTroopData";

export function normalizeOffenseOnlyTroopLevelData(
  rawLevelData: OffenseOnlyTroopRawLevelData,
  damageTypes: readonly DamageType[],
): OffenseOnlyTroopLevelData {
  const { level, isMaxLevel, townHallLevel, damageData } = rawLevelData;

  const normalizedOffenseLevelData = normalizeOffenseDamageData(
    damageData,
    damageTypes,
  );

  return {
    ...normalizedOffenseLevelData,
    level,
    isMaxLevel,
    townHallLevel,
  };
}

export function validateOffenseOnlyTroopEntityData(
  troopData: OffenseOnlyTroopData,
): void {
  validateOffenseEntityData(troopData);
}
