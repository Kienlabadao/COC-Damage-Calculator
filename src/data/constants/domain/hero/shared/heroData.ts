import type { HeroId } from "./id";
import { type BaseData, type BaseLevelData } from "../../shared/baseData";
import {
  normalizeOffenseDamageData,
  type OffenseData,
  type OffenseLevelData,
  type OffenseRawLevelData,
} from "../../shared/offense/offenseData";
import { type DefenseLevelData } from "../../shared/defense/defenseData";

export type HeroRawLevelData = BaseLevelData &
  OffenseRawLevelData &
  DefenseLevelData;

export type HeroLevelData = BaseLevelData & OffenseLevelData & DefenseLevelData;

export type HeroData = BaseData<HeroLevelData> &
  OffenseData & {
    id: HeroId;
  };

export function normalizeHeroLevelData(
  rawLevelData: HeroRawLevelData,
): HeroLevelData {
  const { level, isMaxLevel, townHallLevel, damageData, hp } = rawLevelData;

  const normalizedOffenseLevelData = normalizeOffenseDamageData(damageData);

  return {
    ...normalizedOffenseLevelData,
    level,
    isMaxLevel,
    townHallLevel,
    hp,
  };
}
