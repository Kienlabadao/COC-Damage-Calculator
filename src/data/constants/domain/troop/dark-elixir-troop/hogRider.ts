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
import { TROOP_ID } from "../../shared/id/troopId";
import { TROOP_TYPE } from "../shared/troopType";

const hogRiderRawLevels: Record<number, TroopRawLevelData> = {
  1: {
    level: 1,
    isMaxLevel: false,
    townHallLevel: 7,

    hp: 270,

    damageData: [
      {
        damagePerHit: 60,
      },
    ],
  },
  2: {
    level: 2,
    isMaxLevel: false,
    townHallLevel: 7,

    hp: 312,

    damageData: [
      {
        damagePerHit: 70,
      },
    ],
  },
  3: {
    level: 3,
    isMaxLevel: false,
    townHallLevel: 8,

    hp: 370,

    damageData: [
      {
        damagePerHit: 80,
      },
    ],
  },
  4: {
    level: 4,
    isMaxLevel: false,
    townHallLevel: 8,

    hp: 430,

    damageData: [
      {
        damagePerHit: 92,
      },
    ],
  },
  5: {
    level: 5,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 500,

    damageData: [
      {
        damagePerHit: 105,
      },
    ],
  },
  6: {
    level: 6,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 590,

    damageData: [
      {
        damagePerHit: 118,
      },
    ],
  },
  7: {
    level: 7,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 700,

    damageData: [
      {
        damagePerHit: 140,
      },
    ],
  },
  8: {
    level: 8,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 810,

    damageData: [
      {
        damagePerHit: 155,
      },
    ],
  },
  9: {
    level: 9,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 890,

    damageData: [
      {
        damagePerHit: 165,
      },
    ],
  },
  10: {
    level: 10,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 970,

    damageData: [
      {
        damagePerHit: 176,
      },
    ],
  },
  11: {
    level: 11,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 1080,

    damageData: [
      {
        damagePerHit: 187,
      },
    ],
  },
  12: {
    level: 12,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 1230,

    damageData: [
      {
        damagePerHit: 200,
      },
    ],
  },
  13: {
    level: 13,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 1380,

    damageData: [
      {
        damagePerHit: 213,
      },
    ],
  },
  14: {
    level: 14,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 1500,

    damageData: [
      {
        damagePerHit: 225,
      },
    ],
  },
  15: {
    level: 15,
    isMaxLevel: true,
    townHallLevel: 18,

    hp: 1750,

    damageData: [
      {
        damagePerHit: 250,
      },
    ],
  },
};

const targetType = [TARGET_TYPE.Ground, TARGET_TYPE.Troop];
const damageType = normalizeOffenseDamageTypes([DAMAGE_TYPE.Direct]);

export const HogRider: TroopData = {
  id: TROOP_ID.DarkElixirTroop.HogRider,
  troopType: [TROOP_TYPE.DarkElixir],

  targetType: targetType,

  damageType: damageType,
  attackSpeedBetweenHit: 1,

  ...normalizeLevelData(hogRiderRawLevels, (rawLevelData) =>
    normalizeTroopLevelData(rawLevelData, damageType),
  ),

  canAttackAir: false,

  wikiUrl: "https://clashofclans.fandom.com/wiki/Hog_Rider",
};

validateTroopEntityData(HogRider);
