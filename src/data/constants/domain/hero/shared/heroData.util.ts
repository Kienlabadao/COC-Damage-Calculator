import {
  normalizeOffenseDamageData,
  validateOffenseEntityData,
} from "../../shared/offense/offenseData.util";
import { type DamageType } from "../../shared/offense/damageType";
import {
  type HeroData,
  type HeroLevelData,
  type HeroRawLevelData,
} from "./heroData";

export function normalizeHeroLevelData(
  rawLevelData: HeroRawLevelData,
  damageTypes: DamageType[],
): HeroLevelData {
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

export function validateHeroEntityData(heroData: HeroData): void {
  validateOffenseEntityData(heroData);
}
