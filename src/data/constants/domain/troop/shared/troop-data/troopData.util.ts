import {
  normalizeOffenseDamageData,
  validateOffenseEntityData,
} from "../../../shared/offense/offenseData.util";
import { type DamageType } from "../../../shared/offense/damageType";
import {
  type TroopData,
  type TroopLevelData,
  type TroopRawLevelData,
} from "./troopData";

export function normalizeTroopLevelData(
  rawLevelData: TroopRawLevelData,
  damageTypes: DamageType[],
): TroopLevelData {
  const { level, isMaxLevel, townHallLevel, damageData, hp } = rawLevelData;

  const normalizedOffenseLevelData = normalizeOffenseDamageData(
    damageData,
    damageTypes,
  );

  return {
    ...normalizedOffenseLevelData,
    level,
    isMaxLevel,
    townHallLevel,
    hp,
  };
}

export function validateTroopEntityData(troopData: TroopData): void {
  validateOffenseEntityData(troopData);
}
