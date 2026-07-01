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

const archerQueenRawLevels: Record<number, HeroRawLevelData> = {
  1: {
    level: 1,
    isMaxLevel: false,
    townHallLevel: 8,

    hp: 580,

    damageData: [
      {
        damagePerHit: 102,
      },
    ],
  },
  2: {
    level: 2,
    isMaxLevel: false,
    townHallLevel: 8,

    hp: 592,

    damageData: [
      {
        damagePerHit: 104.25,
      },
    ],
  },
  3: {
    level: 3,
    isMaxLevel: false,
    townHallLevel: 8,

    hp: 604,

    damageData: [
      {
        damagePerHit: 107.25,
      },
    ],
  },
  4: {
    level: 4,
    isMaxLevel: false,
    townHallLevel: 8,

    hp: 617,

    damageData: [
      {
        damagePerHit: 109.5,
      },
    ],
  },
  5: {
    level: 5,
    isMaxLevel: false,
    townHallLevel: 8,

    hp: 630,

    damageData: [
      {
        damagePerHit: 112.5,
      },
    ],
  },
  6: {
    level: 6,
    isMaxLevel: false,
    townHallLevel: 8,

    hp: 643,

    damageData: [
      {
        damagePerHit: 115.5,
      },
    ],
  },
  7: {
    level: 7,
    isMaxLevel: false,
    townHallLevel: 8,

    hp: 657,

    damageData: [
      {
        damagePerHit: 117.75,
      },
    ],
  },
  8: {
    level: 8,
    isMaxLevel: false,
    townHallLevel: 8,

    hp: 670,

    damageData: [
      {
        damagePerHit: 121.5,
      },
    ],
  },
  9: {
    level: 9,
    isMaxLevel: false,
    townHallLevel: 8,

    hp: 685,

    damageData: [
      {
        damagePerHit: 123.75,
      },
    ],
  },
  10: {
    level: 10,
    isMaxLevel: false,
    townHallLevel: 8,

    hp: 699,

    damageData: [
      {
        damagePerHit: 126.75,
      },
    ],
  },
  11: {
    level: 11,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 714,

    damageData: [
      {
        damagePerHit: 129.75,
      },
    ],
  },
  12: {
    level: 12,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 729,

    damageData: [
      {
        damagePerHit: 133.5,
      },
    ],
  },
  13: {
    level: 13,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 744,

    damageData: [
      {
        damagePerHit: 137.25,
      },
    ],
  },
  14: {
    level: 14,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 759,

    damageData: [
      {
        damagePerHit: 140.25,
      },
    ],
  },
  15: {
    level: 15,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 775,

    damageData: [
      {
        damagePerHit: 144,
      },
    ],
  },
  16: {
    level: 16,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 792,

    damageData: [
      {
        damagePerHit: 147,
      },
    ],
  },
  17: {
    level: 17,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 808,

    damageData: [
      {
        damagePerHit: 150.75,
      },
    ],
  },
  18: {
    level: 18,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 826,

    damageData: [
      {
        damagePerHit: 155.25,
      },
    ],
  },
  19: {
    level: 19,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 842,

    damageData: [
      {
        damagePerHit: 159,
      },
    ],
  },
  20: {
    level: 20,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 861,

    damageData: [
      {
        damagePerHit: 162.75,
      },
    ],
  },
  21: {
    level: 21,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 878,

    damageData: [
      {
        damagePerHit: 167.25,
      },
    ],
  },
  22: {
    level: 22,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 897,

    damageData: [
      {
        damagePerHit: 171,
      },
    ],
  },
  23: {
    level: 23,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 916,

    damageData: [
      {
        damagePerHit: 175.5,
      },
    ],
  },
  24: {
    level: 24,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 935,

    damageData: [
      {
        damagePerHit: 180,
      },
    ],
  },
  25: {
    level: 25,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 954,

    damageData: [
      {
        damagePerHit: 184.5,
      },
    ],
  },
  26: {
    level: 26,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 974,

    damageData: [
      {
        damagePerHit: 189,
      },
    ],
  },
  27: {
    level: 27,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 995,

    damageData: [
      {
        damagePerHit: 193.5,
      },
    ],
  },
  28: {
    level: 28,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 1016,

    damageData: [
      {
        damagePerHit: 198,
      },
    ],
  },
  29: {
    level: 29,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 1038,

    damageData: [
      {
        damagePerHit: 203.25,
      },
    ],
  },
  30: {
    level: 30,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 1059,

    damageData: [
      {
        damagePerHit: 208.5,
      },
    ],
  },
  31: {
    level: 31,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 1082,

    damageData: [
      {
        damagePerHit: 213.75,
      },
    ],
  },
  32: {
    level: 32,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 1104,

    damageData: [
      {
        damagePerHit: 219,
      },
    ],
  },
  33: {
    level: 33,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 1127,

    damageData: [
      {
        damagePerHit: 224.25,
      },
    ],
  },
  34: {
    level: 34,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 1151,

    damageData: [
      {
        damagePerHit: 230.25,
      },
    ],
  },
  35: {
    level: 35,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 1175,

    damageData: [
      {
        damagePerHit: 236.25,
      },
    ],
  },
  36: {
    level: 36,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 1200,

    damageData: [
      {
        damagePerHit: 241.5,
      },
    ],
  },
  37: {
    level: 37,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 1226,

    damageData: [
      {
        damagePerHit: 248.25,
      },
    ],
  },
  38: {
    level: 38,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 1251,

    damageData: [
      {
        damagePerHit: 253.5,
      },
    ],
  },
  39: {
    level: 39,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 1278,

    damageData: [
      {
        damagePerHit: 260.25,
      },
    ],
  },
  40: {
    level: 40,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 1304,

    damageData: [
      {
        damagePerHit: 267,
      },
    ],
  },
  41: {
    level: 41,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 1331,

    damageData: [
      {
        damagePerHit: 273.75,
      },
    ],
  },
  42: {
    level: 42,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 1359,

    damageData: [
      {
        damagePerHit: 280.5,
      },
    ],
  },
  43: {
    level: 43,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 1388,

    damageData: [
      {
        damagePerHit: 287.25,
      },
    ],
  },
  44: {
    level: 44,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 1417,

    damageData: [
      {
        damagePerHit: 294.75,
      },
    ],
  },
  45: {
    level: 45,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 1447,

    damageData: [
      {
        damagePerHit: 302.25,
      },
    ],
  },
  46: {
    level: 46,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 1478,

    damageData: [
      {
        damagePerHit: 309.75,
      },
    ],
  },
  47: {
    level: 47,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 1508,

    damageData: [
      {
        damagePerHit: 317.25,
      },
    ],
  },
  48: {
    level: 48,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 1540,

    damageData: [
      {
        damagePerHit: 325.5,
      },
    ],
  },
  49: {
    level: 49,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 1572,

    damageData: [
      {
        damagePerHit: 333.75,
      },
    ],
  },
  50: {
    level: 50,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 1606,

    damageData: [
      {
        damagePerHit: 342,
      },
    ],
  },
  51: {
    level: 51,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 1646,

    damageData: [
      {
        damagePerHit: 348.75,
      },
    ],
  },
  52: {
    level: 52,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 1688,

    damageData: [
      {
        damagePerHit: 355.5,
      },
    ],
  },
  53: {
    level: 53,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 1730,

    damageData: [
      {
        damagePerHit: 363.75,
      },
    ],
  },
  54: {
    level: 54,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 1774,

    damageData: [
      {
        damagePerHit: 371.25,
      },
    ],
  },
  55: {
    level: 55,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 1819,

    damageData: [
      {
        damagePerHit: 378.75,
      },
    ],
  },
  56: {
    level: 56,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 1865,

    damageData: [
      {
        damagePerHit: 386.25,
      },
    ],
  },
  57: {
    level: 57,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 1912,

    damageData: [
      {
        damagePerHit: 394.5,
      },
    ],
  },
  58: {
    level: 58,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 1960,

    damageData: [
      {
        damagePerHit: 402.75,
      },
    ],
  },
  59: {
    level: 59,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 2010,

    damageData: [
      {
        damagePerHit: 411,
      },
    ],
  },
  60: {
    level: 60,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 2060,

    damageData: [
      {
        damagePerHit: 419.25,
      },
    ],
  },
  61: {
    level: 61,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 2111,

    damageData: [
      {
        damagePerHit: 427.5,
      },
    ],
  },
  62: {
    level: 62,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 2164,

    damageData: [
      {
        damagePerHit: 435.75,
      },
    ],
  },
  63: {
    level: 63,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 2218,

    damageData: [
      {
        damagePerHit: 444.75,
      },
    ],
  },
  64: {
    level: 64,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 2274,

    damageData: [
      {
        damagePerHit: 453.75,
      },
    ],
  },
  65: {
    level: 65,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 2330,

    damageData: [
      {
        damagePerHit: 462.75,
      },
    ],
  },
  66: {
    level: 66,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 2384,

    damageData: [
      {
        damagePerHit: 471,
      },
    ],
  },
  67: {
    level: 67,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 2432,

    damageData: [
      {
        damagePerHit: 478.5,
      },
    ],
  },
  68: {
    level: 68,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 2476,

    damageData: [
      {
        damagePerHit: 486,
      },
    ],
  },
  69: {
    level: 69,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 2516,

    damageData: [
      {
        damagePerHit: 492,
      },
    ],
  },
  70: {
    level: 70,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 2552,

    damageData: [
      {
        damagePerHit: 498,
      },
    ],
  },
  71: {
    level: 71,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 2584,

    damageData: [
      {
        damagePerHit: 503.25,
      },
    ],
  },
  72: {
    level: 72,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 2616,

    damageData: [
      {
        damagePerHit: 507.75,
      },
    ],
  },
  73: {
    level: 73,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 2648,

    damageData: [
      {
        damagePerHit: 511.5,
      },
    ],
  },
  74: {
    level: 74,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 2680,

    damageData: [
      {
        damagePerHit: 515.25,
      },
    ],
  },
  75: {
    level: 75,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 2712,

    damageData: [
      {
        damagePerHit: 519,
      },
    ],
  },
  76: {
    level: 76,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 2740,

    damageData: [
      {
        damagePerHit: 522.75,
      },
    ],
  },
  77: {
    level: 77,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 2768,

    damageData: [
      {
        damagePerHit: 525.75,
      },
    ],
  },
  78: {
    level: 78,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 2796,

    damageData: [
      {
        damagePerHit: 529.5,
      },
    ],
  },
  79: {
    level: 79,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 2824,

    damageData: [
      {
        damagePerHit: 532.5,
      },
    ],
  },
  80: {
    level: 80,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 2852,

    damageData: [
      {
        damagePerHit: 535.5,
      },
    ],
  },
  81: {
    level: 81,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 2880,

    damageData: [
      {
        damagePerHit: 537.75,
      },
    ],
  },
  82: {
    level: 82,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 2904,

    damageData: [
      {
        damagePerHit: 540.75,
      },
    ],
  },
  83: {
    level: 83,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 2928,

    damageData: [
      {
        damagePerHit: 543,
      },
    ],
  },
  84: {
    level: 84,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 2952,

    damageData: [
      {
        damagePerHit: 546,
      },
    ],
  },
  85: {
    level: 85,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 2976,

    damageData: [
      {
        damagePerHit: 548.25,
      },
    ],
  },
  86: {
    level: 86,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 3000,

    damageData: [
      {
        damagePerHit: 550.5,
      },
    ],
  },
  87: {
    level: 87,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 3024,

    damageData: [
      {
        damagePerHit: 553.5,
      },
    ],
  },
  88: {
    level: 88,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 3048,

    damageData: [
      {
        damagePerHit: 555.75,
      },
    ],
  },
  89: {
    level: 89,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 3072,

    damageData: [
      {
        damagePerHit: 558.75,
      },
    ],
  },
  90: {
    level: 90,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 3096,

    damageData: [
      {
        damagePerHit: 561,
      },
    ],
  },
  91: {
    level: 91,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 3120,

    damageData: [
      {
        damagePerHit: 563.25,
      },
    ],
  },
  92: {
    level: 92,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 3144,

    damageData: [
      {
        damagePerHit: 566.25,
      },
    ],
  },
  93: {
    level: 93,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 3168,

    damageData: [
      {
        damagePerHit: 568.5,
      },
    ],
  },
  94: {
    level: 94,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 3192,

    damageData: [
      {
        damagePerHit: 571.5,
      },
    ],
  },
  95: {
    level: 95,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 3216,

    damageData: [
      {
        damagePerHit: 573.75,
      },
    ],
  },
  96: {
    level: 96,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 3240,

    damageData: [
      {
        damagePerHit: 576,
      },
    ],
  },
  97: {
    level: 97,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 3264,

    damageData: [
      {
        damagePerHit: 578.25,
      },
    ],
  },
  98: {
    level: 98,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 3288,

    damageData: [
      {
        damagePerHit: 580.5,
      },
    ],
  },
  99: {
    level: 99,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 3312,

    damageData: [
      {
        damagePerHit: 582.75,
      },
    ],
  },
  100: {
    level: 100,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 3336,

    damageData: [
      {
        damagePerHit: 585,
      },
    ],
  },
  101: {
    level: 101,
    isMaxLevel: false,
    townHallLevel: 18,

    hp: 3360,

    damageData: [
      {
        damagePerHit: 587.25,
      },
    ],
  },
  102: {
    level: 102,
    isMaxLevel: false,
    townHallLevel: 18,

    hp: 3384,

    damageData: [
      {
        damagePerHit: 589.5,
      },
    ],
  },
  103: {
    level: 103,
    isMaxLevel: false,
    townHallLevel: 18,

    hp: 3408,

    damageData: [
      {
        damagePerHit: 591.75,
      },
    ],
  },
  104: {
    level: 104,
    isMaxLevel: false,
    townHallLevel: 18,

    hp: 3432,

    damageData: [
      {
        damagePerHit: 594,
      },
    ],
  },
  105: {
    level: 105,
    isMaxLevel: false,
    townHallLevel: 18,

    hp: 3456,

    damageData: [
      {
        damagePerHit: 596.25,
      },
    ],
  },
  106: {
    level: 106,
    isMaxLevel: false,
    townHallLevel: 18,

    hp: 3480,

    damageData: [
      {
        damagePerHit: 598.5,
      },
    ],
  },
  107: {
    level: 107,
    isMaxLevel: false,
    townHallLevel: 18,

    hp: 3504,

    damageData: [
      {
        damagePerHit: 600.75,
      },
    ],
  },
  108: {
    level: 108,
    isMaxLevel: false,
    townHallLevel: 18,

    hp: 3528,

    damageData: [
      {
        damagePerHit: 603,
      },
    ],
  },
  109: {
    level: 109,
    isMaxLevel: false,
    townHallLevel: 18,

    hp: 3552,

    damageData: [
      {
        damagePerHit: 605.25,
      },
    ],
  },
  110: {
    level: 110,
    isMaxLevel: true,
    townHallLevel: 18,

    hp: 3576,

    damageData: [
      {
        damagePerHit: 607.5,
      },
    ],
  },
};

const targetType = [TARGET_TYPE.Ground, TARGET_TYPE.Hero];
const damageType = normalizeOffenseDamageTypes([DAMAGE_TYPE.Direct]);

export const ArcherQueen: HeroData = {
  id: HERO_ID.ArcherQueen,
  targetType: targetType,

  damageType: damageType,
  attackSpeedBetweenHit: 0.75,

  ...normalizeLevelData(archerQueenRawLevels, (rawLevelData) =>
    normalizeHeroLevelData(rawLevelData, damageType),
  ),

  canAttackAir: true,

  wikiUrl: "https://clashofclans.fandom.com/wiki/Archer_Queen",
};

validateHeroEntityData(ArcherQueen);
