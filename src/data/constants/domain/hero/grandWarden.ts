import { normalizeLevelData } from "../shared/baseData";
import { DAMAGE_TYPE } from "../shared/offense/damageType";
import {
  normalizeHeroLevelData,
  type HeroData,
  type HeroRawLevelData,
} from "./shared/heroData";
import { HERO_ID } from "./shared/id";

const grandWardenRawLevels: Record<number, HeroRawLevelData> = {
  1: {
    level: 1,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 850,

    damageData: [
      {
        damagePerHit: 77.4,
      },
    ],
  },
  2: {
    level: 2,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 868,

    damageData: [
      {
        damagePerHit: 79.2,
      },
    ],
  },
  3: {
    level: 3,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 886,

    damageData: [
      {
        damagePerHit: 82.8,
      },
    ],
  },
  4: {
    level: 4,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 904,

    damageData: [
      {
        damagePerHit: 86.4,
      },
    ],
  },
  5: {
    level: 5,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 923,

    damageData: [
      {
        damagePerHit: 88.2,
      },
    ],
  },
  6: {
    level: 6,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 942,

    damageData: [
      {
        damagePerHit: 91.8,
      },
    ],
  },
  7: {
    level: 7,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 961,

    damageData: [
      {
        damagePerHit: 97.2,
      },
    ],
  },
  8: {
    level: 8,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 982,

    damageData: [
      {
        damagePerHit: 100.8,
      },
    ],
  },
  9: {
    level: 9,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 1003,

    damageData: [
      {
        damagePerHit: 106.2,
      },
    ],
  },
  10: {
    level: 10,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 1025,

    damageData: [
      {
        damagePerHit: 109.8,
      },
    ],
  },
  11: {
    level: 11,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 1048,

    damageData: [
      {
        damagePerHit: 115.2,
      },
    ],
  },
  12: {
    level: 12,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 1072,

    damageData: [
      {
        damagePerHit: 118.8,
      },
    ],
  },
  13: {
    level: 13,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 1097,

    damageData: [
      {
        damagePerHit: 126,
      },
    ],
  },
  14: {
    level: 14,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 1122,

    damageData: [
      {
        damagePerHit: 131.4,
      },
    ],
  },
  15: {
    level: 15,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 1148,

    damageData: [
      {
        damagePerHit: 138.6,
      },
    ],
  },
  16: {
    level: 16,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 1173,

    damageData: [
      {
        damagePerHit: 144,
      },
    ],
  },
  17: {
    level: 17,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 1199,

    damageData: [
      {
        damagePerHit: 149.4,
      },
    ],
  },
  18: {
    level: 18,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 1224,

    damageData: [
      {
        damagePerHit: 156.6,
      },
    ],
  },
  19: {
    level: 19,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 1250,

    damageData: [
      {
        damagePerHit: 162,
      },
    ],
  },
  20: {
    level: 20,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 1275,

    damageData: [
      {
        damagePerHit: 169.2,
      },
    ],
  },
  21: {
    level: 21,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 1301,

    damageData: [
      {
        damagePerHit: 176.4,
      },
    ],
  },
  22: {
    level: 22,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 1327,

    damageData: [
      {
        damagePerHit: 183.6,
      },
    ],
  },
  23: {
    level: 23,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 1354,

    damageData: [
      {
        damagePerHit: 190.8,
      },
    ],
  },
  24: {
    level: 24,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 1381,

    damageData: [
      {
        damagePerHit: 199.8,
      },
    ],
  },
  25: {
    level: 25,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 1409,

    damageData: [
      {
        damagePerHit: 208.8,
      },
    ],
  },
  26: {
    level: 26,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 1438,

    damageData: [
      {
        damagePerHit: 217.8,
      },
    ],
  },
  27: {
    level: 27,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 1467,

    damageData: [
      {
        damagePerHit: 226.8,
      },
    ],
  },
  28: {
    level: 28,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 1497,

    damageData: [
      {
        damagePerHit: 235.8,
      },
    ],
  },
  29: {
    level: 29,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 1527,

    damageData: [
      {
        damagePerHit: 246.6,
      },
    ],
  },
  30: {
    level: 30,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 1558,

    damageData: [
      {
        damagePerHit: 257.4,
      },
    ],
  },
  31: {
    level: 31,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 1590,

    damageData: [
      {
        damagePerHit: 268.2,
      },
    ],
  },
  32: {
    level: 32,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 1622,

    damageData: [
      {
        damagePerHit: 279,
      },
    ],
  },
  33: {
    level: 33,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 1655,

    damageData: [
      {
        damagePerHit: 291.6,
      },
    ],
  },
  34: {
    level: 34,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 1688,

    damageData: [
      {
        damagePerHit: 302.4,
      },
    ],
  },
  35: {
    level: 35,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 1722,

    damageData: [
      {
        damagePerHit: 315,
      },
    ],
  },
  36: {
    level: 36,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 1757,

    damageData: [
      {
        damagePerHit: 329.4,
      },
    ],
  },
  37: {
    level: 37,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 1793,

    damageData: [
      {
        damagePerHit: 342,
      },
    ],
  },
  38: {
    level: 38,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 1829,

    damageData: [
      {
        damagePerHit: 356.4,
      },
    ],
  },
  39: {
    level: 39,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 1867,

    damageData: [
      {
        damagePerHit: 372.6,
      },
    ],
  },
  40: {
    level: 40,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 1904,

    damageData: [
      {
        damagePerHit: 387,
      },
    ],
  },
  41: {
    level: 41,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 1921,

    damageData: [
      {
        damagePerHit: 397.8,
      },
    ],
  },
  42: {
    level: 42,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 1938,

    damageData: [
      {
        damagePerHit: 406.8,
      },
    ],
  },
  43: {
    level: 43,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 1955,

    damageData: [
      {
        damagePerHit: 414,
      },
    ],
  },
  44: {
    level: 44,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 1972,

    damageData: [
      {
        damagePerHit: 421.2,
      },
    ],
  },
  45: {
    level: 45,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 1989,

    damageData: [
      {
        damagePerHit: 426.6,
      },
    ],
  },
  46: {
    level: 46,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 2006,

    damageData: [
      {
        damagePerHit: 433.8,
      },
    ],
  },
  47: {
    level: 47,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 2023,

    damageData: [
      {
        damagePerHit: 439.2,
      },
    ],
  },
  48: {
    level: 48,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 2040,

    damageData: [
      {
        damagePerHit: 444.6,
      },
    ],
  },
  49: {
    level: 49,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 2057,

    damageData: [
      {
        damagePerHit: 451.8,
      },
    ],
  },
  50: {
    level: 50,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 2074,

    damageData: [
      {
        damagePerHit: 457.2,
      },
    ],
  },
  51: {
    level: 51,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 2091,

    damageData: [
      {
        damagePerHit: 464.4,
      },
    ],
  },
  52: {
    level: 52,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 2108,

    damageData: [
      {
        damagePerHit: 469.8,
      },
    ],
  },
  53: {
    level: 53,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 2125,

    damageData: [
      {
        damagePerHit: 475.2,
      },
    ],
  },
  54: {
    level: 54,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 2142,

    damageData: [
      {
        damagePerHit: 482.4,
      },
    ],
  },
  55: {
    level: 55,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 2159,

    damageData: [
      {
        damagePerHit: 487.8,
      },
    ],
  },
  56: {
    level: 56,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 2176,

    damageData: [
      {
        damagePerHit: 493.2,
      },
    ],
  },
  57: {
    level: 57,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 2193,

    damageData: [
      {
        damagePerHit: 496.8,
      },
    ],
  },
  58: {
    level: 58,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 2210,

    damageData: [
      {
        damagePerHit: 502.2,
      },
    ],
  },
  59: {
    level: 59,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 2227,

    damageData: [
      {
        damagePerHit: 505.8,
      },
    ],
  },
  60: {
    level: 60,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 2244,

    damageData: [
      {
        damagePerHit: 511.2,
      },
    ],
  },
  61: {
    level: 61,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 2261,

    damageData: [
      {
        damagePerHit: 514.8,
      },
    ],
  },
  62: {
    level: 62,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 2278,

    damageData: [
      {
        damagePerHit: 520.2,
      },
    ],
  },
  63: {
    level: 63,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 2295,

    damageData: [
      {
        damagePerHit: 525.6,
      },
    ],
  },
  64: {
    level: 64,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 2312,

    damageData: [
      {
        damagePerHit: 529.2,
      },
    ],
  },
  65: {
    level: 65,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 2329,

    damageData: [
      {
        damagePerHit: 534.6,
      },
    ],
  },
  66: {
    level: 66,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 2346,

    damageData: [
      {
        damagePerHit: 538.2,
      },
    ],
  },
  67: {
    level: 67,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 2363,

    damageData: [
      {
        damagePerHit: 543.6,
      },
    ],
  },
  68: {
    level: 68,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 2380,

    damageData: [
      {
        damagePerHit: 547.2,
      },
    ],
  },
  69: {
    level: 69,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 2397,

    damageData: [
      {
        damagePerHit: 552.6,
      },
    ],
  },
  70: {
    level: 70,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 2414,

    damageData: [
      {
        damagePerHit: 556.2,
      },
    ],
  },
  71: {
    level: 71,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 2431,

    damageData: [
      {
        damagePerHit: 561.6,
      },
    ],
  },
  72: {
    level: 72,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 2448,

    damageData: [
      {
        damagePerHit: 567,
      },
    ],
  },
  73: {
    level: 73,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 2465,

    damageData: [
      {
        damagePerHit: 572.4,
      },
    ],
  },
  74: {
    level: 74,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 2482,

    damageData: [
      {
        damagePerHit: 577.8,
      },
    ],
  },
  75: {
    level: 75,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 2499,

    damageData: [
      {
        damagePerHit: 583.2,
      },
    ],
  },
  76: {
    level: 76,
    isMaxLevel: false,
    townHallLevel: 18,

    hp: 2516,

    damageData: [
      {
        damagePerHit: 588.6,
      },
    ],
  },
  77: {
    level: 77,
    isMaxLevel: false,
    townHallLevel: 18,

    hp: 2533,

    damageData: [
      {
        damagePerHit: 594,
      },
    ],
  },
  78: {
    level: 78,
    isMaxLevel: false,
    townHallLevel: 18,

    hp: 2550,

    damageData: [
      {
        damagePerHit: 599.4,
      },
    ],
  },
  79: {
    level: 79,
    isMaxLevel: false,
    townHallLevel: 18,

    hp: 2567,

    damageData: [
      {
        damagePerHit: 604.8,
      },
    ],
  },
  80: {
    level: 80,
    isMaxLevel: false,
    townHallLevel: 18,

    hp: 2584,

    damageData: [
      {
        damagePerHit: 610.2,
      },
    ],
  },
  81: {
    level: 81,
    isMaxLevel: false,
    townHallLevel: 18,

    hp: 2601,

    damageData: [
      {
        damagePerHit: 615.6,
      },
    ],
  },
  82: {
    level: 82,
    isMaxLevel: false,
    townHallLevel: 18,

    hp: 2618,

    damageData: [
      {
        damagePerHit: 621,
      },
    ],
  },
  83: {
    level: 83,
    isMaxLevel: false,
    townHallLevel: 18,

    hp: 2635,

    damageData: [
      {
        damagePerHit: 626.4,
      },
    ],
  },
  84: {
    level: 84,
    isMaxLevel: false,
    townHallLevel: 18,

    hp: 2652,

    damageData: [
      {
        damagePerHit: 631.8,
      },
    ],
  },
  85: {
    level: 85,
    isMaxLevel: true,
    townHallLevel: 18,

    hp: 2669,

    damageData: [
      {
        damagePerHit: 637.2,
      },
    ],
  },
};

export const GrandWarden: HeroData = {
  id: HERO_ID.GrandWarden,

  damageType: DAMAGE_TYPE.Direct,
  attackSpeedBetweenHit: 1.8,

  ...normalizeLevelData(grandWardenRawLevels, normalizeHeroLevelData),

  canDealDeathDamage: false,
  canDealAuraDamage: false,
  haveSeparateWallDamage: false,
  haveStageDamage: false,
  canDealPointBlankDamage: false,

  canDealChainDamage: false,

  canDealPoisonDamage: false,

  isTemporary: false,

  wikiUrl: "https://clashofclans.fandom.com/wiki/Grand_Warden",
};
