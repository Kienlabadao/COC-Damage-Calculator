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

const giantRawLevels: Record<number, TroopRawLevelData> = {
  1: {
    level: 1,
    isMaxLevel: false,
    townHallLevel: 2,

    hp: 400,

    damageData: [
      {
        damagePerHit: 24,
      },
    ],
  },
  2: {
    level: 2,
    isMaxLevel: false,
    townHallLevel: 4,

    hp: 500,

    damageData: [
      {
        damagePerHit: 30,
      },
    ],
  },
  3: {
    level: 3,
    isMaxLevel: false,
    townHallLevel: 6,

    hp: 600,

    damageData: [
      {
        damagePerHit: 40,
      },
    ],
  },
  4: {
    level: 4,
    isMaxLevel: false,
    townHallLevel: 7,

    hp: 700,

    damageData: [
      {
        damagePerHit: 48,
      },
    ],
  },
  5: {
    level: 5,
    isMaxLevel: false,
    townHallLevel: 8,

    hp: 900,

    damageData: [
      {
        damagePerHit: 62,
      },
    ],
  },
  6: {
    level: 6,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 1100,

    damageData: [
      {
        damagePerHit: 86,
      },
    ],
  },
  7: {
    level: 7,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 1300,

    damageData: [
      {
        damagePerHit: 110,
      },
    ],
  },
  8: {
    level: 8,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 1500,

    damageData: [
      {
        damagePerHit: 124,
      },
    ],
  },
  9: {
    level: 9,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 1850,

    damageData: [
      {
        damagePerHit: 140,
      },
    ],
  },
  10: {
    level: 10,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 2000,

    damageData: [
      {
        damagePerHit: 156,
      },
    ],
  },
  11: {
    level: 11,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 2200,

    damageData: [
      {
        damagePerHit: 172,
      },
    ],
  },
  12: {
    level: 12,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 2400,

    damageData: [
      {
        damagePerHit: 188,
      },
    ],
  },
  13: {
    level: 13,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 2700,

    damageData: [
      {
        damagePerHit: 208,
      },
    ],
  },
  14: {
    level: 14,
    isMaxLevel: true,
    townHallLevel: 18,

    hp: 3000,

    damageData: [
      {
        damagePerHit: 228,
      },
    ],
  },
};

const targetType = [TARGET_TYPE.Ground, TARGET_TYPE.Troop];
const damageType = normalizeOffenseDamageTypes([DAMAGE_TYPE.Direct]);

export const Giant: TroopData = {
  id: TROOP_ID.ElixirTroop.Giant,
  targetType: targetType,

  damageType: damageType,
  attackSpeedBetweenHit: 2,

  ...normalizeLevelData(giantRawLevels, (rawLevelData) =>
    normalizeTroopLevelData(rawLevelData, damageType),
  ),

  canAttackAir: false,

  wikiUrl: "https://clashofclans.fandom.com/wiki/Giant",
};

validateTroopEntityData(Giant);
