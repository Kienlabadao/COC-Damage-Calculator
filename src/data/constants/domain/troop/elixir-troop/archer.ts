import { normalizeLevelData } from "../../shared/baseData.util";
import { DAMAGE_TYPE } from "../../shared/offense/damageType";
import { normalizeOffenseDamageTypes } from "../../shared/offense/offenseData.util";
import { TARGET_TYPE } from "../../shared/target/targetType";
import {
  type TroopData,
  type TroopRawLevelData,
} from "../shared/troop-data/troopData";
import {
  normalizeTroopLevelData,
  validateTroopEntityData,
} from "../shared/troop-data/troopData.util";
import { TROOP_ID } from "../shared/id";

const archerRawLevels: Record<number, TroopRawLevelData> = {
  1: {
    level: 1,
    isMaxLevel: false,
    townHallLevel: 2,

    hp: 22,

    damageData: [
      {
        damagePerHit: 8,
      },
    ],
  },
  2: {
    level: 2,
    isMaxLevel: false,
    townHallLevel: 3,

    hp: 26,

    damageData: [
      {
        damagePerHit: 10,
      },
    ],
  },
  3: {
    level: 3,
    isMaxLevel: false,
    townHallLevel: 5,

    hp: 29,

    damageData: [
      {
        damagePerHit: 13,
      },
    ],
  },
  4: {
    level: 4,
    isMaxLevel: false,
    townHallLevel: 7,

    hp: 33,

    damageData: [
      {
        damagePerHit: 16,
      },
    ],
  },
  5: {
    level: 5,
    isMaxLevel: false,
    townHallLevel: 8,

    hp: 40,

    damageData: [
      {
        damagePerHit: 20,
      },
    ],
  },
  6: {
    level: 6,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 44,

    damageData: [
      {
        damagePerHit: 22,
      },
    ],
  },
  7: {
    level: 7,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 48,

    damageData: [
      {
        damagePerHit: 25,
      },
    ],
  },
  8: {
    level: 8,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 52,

    damageData: [
      {
        damagePerHit: 28,
      },
    ],
  },
  9: {
    level: 9,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 56,

    damageData: [
      {
        damagePerHit: 31,
      },
    ],
  },
  10: {
    level: 10,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 60,

    damageData: [
      {
        damagePerHit: 34,
      },
    ],
  },
  11: {
    level: 11,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 64,

    damageData: [
      {
        damagePerHit: 37,
      },
    ],
  },
  12: {
    level: 12,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 68,

    damageData: [
      {
        damagePerHit: 40,
      },
    ],
  },
  13: {
    level: 13,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 72,

    damageData: [
      {
        damagePerHit: 43,
      },
    ],
  },
  14: {
    level: 14,
    isMaxLevel: true,
    townHallLevel: 18,

    hp: 76,

    damageData: [
      {
        damagePerHit: 46,
      },
    ],
  },
};

const targetType = [TARGET_TYPE.Ground, TARGET_TYPE.Troop];
const damageType = normalizeOffenseDamageTypes([DAMAGE_TYPE.Direct]);

export const Archer: TroopData = {
  id: TROOP_ID.ElixirTroop.Archer,
  targetType: targetType,

  damageType: damageType,
  attackSpeedBetweenHit: 1,

  ...normalizeLevelData(archerRawLevels, (rawLevelData) =>
    normalizeTroopLevelData(rawLevelData, damageType),
  ),

  canAttackAir: true,

  wikiUrl: "https://clashofclans.fandom.com/wiki/Archer",
};

validateTroopEntityData(Archer);
