import { normalizeLevelData } from "../shared/baseData.util";
import { DAMAGE_TYPE } from "../shared/offense/damageType";
import { normalizeOffenseDamageTypes } from "../shared/offense/offenseData.util";
import { TARGET_TYPE } from "../shared/target/targetType";
import { type HeroData, type HeroRawLevelData } from "./shared/heroData";
import {
  normalizeHeroLevelData,
  validateHeroEntityData,
} from "./shared/heroData.util";
import { HERO_ID } from "../shared/id/heroId";

const minionPrinceRawLevels: Record<number, HeroRawLevelData> = {
  1: {
    level: 1,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 200,

    damageData: [
      {
        damagePerHit: 147.05,
      },
    ],
  },
  2: {
    level: 2,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 242,

    damageData: [
      {
        damagePerHit: 150.45,
      },
    ],
  },
  3: {
    level: 3,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 284,

    damageData: [
      {
        damagePerHit: 153.85,
      },
    ],
  },
  4: {
    level: 4,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 326,

    damageData: [
      {
        damagePerHit: 158.95,
      },
    ],
  },
  5: {
    level: 5,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 368,

    damageData: [
      {
        damagePerHit: 162.35,
      },
    ],
  },
  6: {
    level: 6,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 410,

    damageData: [
      {
        damagePerHit: 166.6,
      },
    ],
  },
  7: {
    level: 7,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 452,

    damageData: [
      {
        damagePerHit: 170.85,
      },
    ],
  },
  8: {
    level: 8,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 494,

    damageData: [
      {
        damagePerHit: 175.1,
      },
    ],
  },
  9: {
    level: 9,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 536,

    damageData: [
      {
        damagePerHit: 179.35,
      },
    ],
  },
  10: {
    level: 10,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 578,

    damageData: [
      {
        damagePerHit: 183.6,
      },
    ],
  },
  11: {
    level: 11,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 620,

    damageData: [
      {
        damagePerHit: 188.7,
      },
    ],
  },
  12: {
    level: 12,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 662,

    damageData: [
      {
        damagePerHit: 192.95,
      },
    ],
  },
  13: {
    level: 13,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 704,

    damageData: [
      {
        damagePerHit: 198.05,
      },
    ],
  },
  14: {
    level: 14,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 746,

    damageData: [
      {
        damagePerHit: 202.3,
      },
    ],
  },
  15: {
    level: 15,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 788,

    damageData: [
      {
        damagePerHit: 207.4,
      },
    ],
  },
  16: {
    level: 16,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 830,

    damageData: [
      {
        damagePerHit: 213.35,
      },
    ],
  },
  17: {
    level: 17,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 872,

    damageData: [
      {
        damagePerHit: 218.45,
      },
    ],
  },
  18: {
    level: 18,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 914,

    damageData: [
      {
        damagePerHit: 223.55,
      },
    ],
  },
  19: {
    level: 19,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 956,

    damageData: [
      {
        damagePerHit: 229.5,
      },
    ],
  },
  20: {
    level: 20,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 998,

    damageData: [
      {
        damagePerHit: 235.45,
      },
    ],
  },
  21: {
    level: 21,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 1040,

    damageData: [
      {
        damagePerHit: 241.4,
      },
    ],
  },
  22: {
    level: 22,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 1082,

    damageData: [
      {
        damagePerHit: 246.5,
      },
    ],
  },
  23: {
    level: 23,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 1124,

    damageData: [
      {
        damagePerHit: 253.3,
      },
    ],
  },
  24: {
    level: 24,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 1166,

    damageData: [
      {
        damagePerHit: 259.25,
      },
    ],
  },
  25: {
    level: 25,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 1208,

    damageData: [
      {
        damagePerHit: 266.05,
      },
    ],
  },
  26: {
    level: 26,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 1250,

    damageData: [
      {
        damagePerHit: 272.85,
      },
    ],
  },
  27: {
    level: 27,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 1292,

    damageData: [
      {
        damagePerHit: 279.65,
      },
    ],
  },
  28: {
    level: 28,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 1334,

    damageData: [
      {
        damagePerHit: 286.45,
      },
    ],
  },
  29: {
    level: 29,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 1376,

    damageData: [
      {
        damagePerHit: 293.25,
      },
    ],
  },
  30: {
    level: 30,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 1418,

    damageData: [
      {
        damagePerHit: 300.9,
      },
    ],
  },
  31: {
    level: 31,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 1460,

    damageData: [
      {
        damagePerHit: 308.55,
      },
    ],
  },
  32: {
    level: 32,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 1502,

    damageData: [
      {
        damagePerHit: 316.2,
      },
    ],
  },
  33: {
    level: 33,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 1544,

    damageData: [
      {
        damagePerHit: 323.85,
      },
    ],
  },
  34: {
    level: 34,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 1586,

    damageData: [
      {
        damagePerHit: 332.35,
      },
    ],
  },
  35: {
    level: 35,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 1628,

    damageData: [
      {
        damagePerHit: 340.85,
      },
    ],
  },
  36: {
    level: 36,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 1670,

    damageData: [
      {
        damagePerHit: 349.35,
      },
    ],
  },
  37: {
    level: 37,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 1712,

    damageData: [
      {
        damagePerHit: 356.15,
      },
    ],
  },
  38: {
    level: 38,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 1754,

    damageData: [
      {
        damagePerHit: 362.95,
      },
    ],
  },
  39: {
    level: 39,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 1796,

    damageData: [
      {
        damagePerHit: 371.45,
      },
    ],
  },
  40: {
    level: 40,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 1838,

    damageData: [
      {
        damagePerHit: 379.1,
      },
    ],
  },
  41: {
    level: 41,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 1880,

    damageData: [
      {
        damagePerHit: 386.75,
      },
    ],
  },
  42: {
    level: 42,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 1922,

    damageData: [
      {
        damagePerHit: 394.4,
      },
    ],
  },
  43: {
    level: 43,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 1964,

    damageData: [
      {
        damagePerHit: 402.9,
      },
    ],
  },
  44: {
    level: 44,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 2006,

    damageData: [
      {
        damagePerHit: 411.4,
      },
    ],
  },
  45: {
    level: 45,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 2048,

    damageData: [
      {
        damagePerHit: 419.9,
      },
    ],
  },
  46: {
    level: 46,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 2090,

    damageData: [
      {
        damagePerHit: 428.4,
      },
    ],
  },
  47: {
    level: 47,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 2132,

    damageData: [
      {
        damagePerHit: 436.05,
      },
    ],
  },
  48: {
    level: 48,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 2174,

    damageData: [
      {
        damagePerHit: 444.55,
      },
    ],
  },
  49: {
    level: 49,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 2216,

    damageData: [
      {
        damagePerHit: 453.9,
      },
    ],
  },
  50: {
    level: 50,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 2258,

    damageData: [
      {
        damagePerHit: 463.25,
      },
    ],
  },
  51: {
    level: 51,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 2300,

    damageData: [
      {
        damagePerHit: 472.6,
      },
    ],
  },
  52: {
    level: 52,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 2342,

    damageData: [
      {
        damagePerHit: 481.1,
      },
    ],
  },
  53: {
    level: 53,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 2384,

    damageData: [
      {
        damagePerHit: 488.75,
      },
    ],
  },
  54: {
    level: 54,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 2426,

    damageData: [
      {
        damagePerHit: 496.4,
      },
    ],
  },
  55: {
    level: 55,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 2468,

    damageData: [
      {
        damagePerHit: 502.35,
      },
    ],
  },
  56: {
    level: 56,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 2510,

    damageData: [
      {
        damagePerHit: 508.3,
      },
    ],
  },
  57: {
    level: 57,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 2552,

    damageData: [
      {
        damagePerHit: 513.4,
      },
    ],
  },
  58: {
    level: 58,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 2594,

    damageData: [
      {
        damagePerHit: 518.5,
      },
    ],
  },
  59: {
    level: 59,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 2636,

    damageData: [
      {
        damagePerHit: 521.9,
      },
    ],
  },
  60: {
    level: 60,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 2678,

    damageData: [
      {
        damagePerHit: 526.15,
      },
    ],
  },
  61: {
    level: 61,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 2720,

    damageData: [
      {
        damagePerHit: 529.55,
      },
    ],
  },
  62: {
    level: 62,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 2762,

    damageData: [
      {
        damagePerHit: 533.8,
      },
    ],
  },
  63: {
    level: 63,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 2804,

    damageData: [
      {
        damagePerHit: 536.35,
      },
    ],
  },
  64: {
    level: 64,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 2846,

    damageData: [
      {
        damagePerHit: 540.6,
      },
    ],
  },
  65: {
    level: 65,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 2888,

    damageData: [
      {
        damagePerHit: 543.15,
      },
    ],
  },
  66: {
    level: 66,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 2930,

    damageData: [
      {
        damagePerHit: 546.55,
      },
    ],
  },
  67: {
    level: 67,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 2972,

    damageData: [
      {
        damagePerHit: 549.1,
      },
    ],
  },
  68: {
    level: 68,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 3014,

    damageData: [
      {
        damagePerHit: 551.65,
      },
    ],
  },
  69: {
    level: 69,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 3056,

    damageData: [
      {
        damagePerHit: 554.2,
      },
    ],
  },
  70: {
    level: 70,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 3098,

    damageData: [
      {
        damagePerHit: 557.6,
      },
    ],
  },
  71: {
    level: 71,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 3161,

    damageData: [
      {
        damagePerHit: 559.3,
      },
    ],
  },
  72: {
    level: 72,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 3224,

    damageData: [
      {
        damagePerHit: 561.85,
      },
    ],
  },
  73: {
    level: 73,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 3287,

    damageData: [
      {
        damagePerHit: 565.25,
      },
    ],
  },
  74: {
    level: 74,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 3350,

    damageData: [
      {
        damagePerHit: 569.5,
      },
    ],
  },
  75: {
    level: 75,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 3413,

    damageData: [
      {
        damagePerHit: 573.75,
      },
    ],
  },
  76: {
    level: 76,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 3476,

    damageData: [
      {
        damagePerHit: 578,
      },
    ],
  },
  77: {
    level: 77,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 3539,

    damageData: [
      {
        damagePerHit: 582.25,
      },
    ],
  },
  78: {
    level: 78,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 3602,

    damageData: [
      {
        damagePerHit: 586.5,
      },
    ],
  },
  79: {
    level: 79,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 3665,

    damageData: [
      {
        damagePerHit: 590.75,
      },
    ],
  },
  80: {
    level: 80,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 3728,

    damageData: [
      {
        damagePerHit: 595,
      },
    ],
  },
  81: {
    level: 81,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 3791,

    damageData: [
      {
        damagePerHit: 599.25,
      },
    ],
  },
  82: {
    level: 82,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 3854,

    damageData: [
      {
        damagePerHit: 603.5,
      },
    ],
  },
  83: {
    level: 83,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 3917,

    damageData: [
      {
        damagePerHit: 607.75,
      },
    ],
  },
  84: {
    level: 84,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 3980,

    damageData: [
      {
        damagePerHit: 612,
      },
    ],
  },
  85: {
    level: 85,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 4043,

    damageData: [
      {
        damagePerHit: 616.25,
      },
    ],
  },
  86: {
    level: 86,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 4106,

    damageData: [
      {
        damagePerHit: 620.5,
      },
    ],
  },
  87: {
    level: 87,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 4169,

    damageData: [
      {
        damagePerHit: 624.75,
      },
    ],
  },
  88: {
    level: 88,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 4232,

    damageData: [
      {
        damagePerHit: 629,
      },
    ],
  },
  89: {
    level: 89,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 4295,

    damageData: [
      {
        damagePerHit: 633.25,
      },
    ],
  },
  90: {
    level: 90,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 4358,

    damageData: [
      {
        damagePerHit: 637.5,
      },
    ],
  },
  91: {
    level: 91,
    isMaxLevel: false,
    townHallLevel: 18,

    hp: 4390,

    damageData: [
      {
        damagePerHit: 640.05,
      },
    ],
  },
  92: {
    level: 92,
    isMaxLevel: false,
    townHallLevel: 18,

    hp: 4420,

    damageData: [
      {
        damagePerHit: 642.6,
      },
    ],
  },
  93: {
    level: 93,
    isMaxLevel: false,
    townHallLevel: 18,

    hp: 4450,

    damageData: [
      {
        damagePerHit: 645.15,
      },
    ],
  },
  94: {
    level: 94,
    isMaxLevel: false,
    townHallLevel: 18,

    hp: 4480,

    damageData: [
      {
        damagePerHit: 647.7,
      },
    ],
  },
  95: {
    level: 95,
    isMaxLevel: true,
    townHallLevel: 18,

    hp: 4510,

    damageData: [
      {
        damagePerHit: 650.25,
      },
    ],
  },
};

const targetType = [TARGET_TYPE.Air, TARGET_TYPE.Hero];
const damageType = normalizeOffenseDamageTypes([DAMAGE_TYPE.Direct]);

export const MinionPrince: HeroData = {
  id: HERO_ID.MinionPrince,
  targetType: targetType,

  damageType: damageType,
  attackSpeedBetweenHit: 0.85,

  ...normalizeLevelData(minionPrinceRawLevels, (rawLevelData) =>
    normalizeHeroLevelData(rawLevelData, damageType),
  ),

  canAttackAir: true,

  wikiUrl: "https://clashofclans.fandom.com/wiki/Minion_Prince",
};

validateHeroEntityData(MinionPrince);
