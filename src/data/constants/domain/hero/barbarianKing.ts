import { DAMAGE_TYPE } from "../shared/offense/damageType";
import { normalizeLevelData } from "../shared/baseData.util";
import { normalizeOffenseDamageTypes } from "../shared/offense/offenseData.util";
import { type HeroData, type HeroRawLevelData } from "./shared/heroData";
import {
  normalizeHeroLevelData,
  validateHeroEntityData,
} from "./shared/heroData.util";
import { HERO_ID } from "./shared/id";
import { TARGET_TYPE } from "../shared/target/targetType";

const barbarianKingRawLevels: Record<number, HeroRawLevelData> = {
  1: {
    level: 1,
    isMaxLevel: false,
    townHallLevel: 4,

    hp: 722.5,

    damageData: [
      {
        damagePerHit: 61.2,
      },
    ],
  },
  2: {
    level: 1,
    isMaxLevel: false,
    townHallLevel: 5,

    hp: 1083.75,

    damageData: [
      {
        damagePerHit: 91.8,
      },
    ],
  },
  3: {
    level: 1,
    isMaxLevel: false,
    townHallLevel: 6,

    hp: 1445,

    damageData: [
      {
        damagePerHit: 122.4,
      },
    ],
  },
  4: {
    level: 2,
    isMaxLevel: false,
    townHallLevel: 7,

    hp: 1481,

    damageData: [
      {
        damagePerHit: 124.8,
      },
    ],
  },
  5: {
    level: 3,
    isMaxLevel: false,
    townHallLevel: 7,

    hp: 1518,

    damageData: [
      {
        damagePerHit: 126,
      },
    ],
  },
  6: {
    level: 4,
    isMaxLevel: false,
    townHallLevel: 7,

    hp: 1556,

    damageData: [
      {
        damagePerHit: 129.6,
      },
    ],
  },
  7: {
    level: 5,
    isMaxLevel: false,
    townHallLevel: 7,

    hp: 1595,

    damageData: [
      {
        damagePerHit: 132,
      },
    ],
  },
  8: {
    level: 6,
    isMaxLevel: false,
    townHallLevel: 7,

    hp: 1635,

    damageData: [
      {
        damagePerHit: 134.4,
      },
    ],
  },
  9: {
    level: 7,
    isMaxLevel: false,
    townHallLevel: 7,

    hp: 1675,

    damageData: [
      {
        damagePerHit: 138,
      },
    ],
  },
  10: {
    level: 8,
    isMaxLevel: false,
    townHallLevel: 7,

    hp: 1717,

    damageData: [
      {
        damagePerHit: 139.2,
      },
    ],
  },
  11: {
    level: 9,
    isMaxLevel: false,
    townHallLevel: 7,

    hp: 1760,

    damageData: [
      {
        damagePerHit: 142.8,
      },
    ],
  },
  12: {
    level: 10,
    isMaxLevel: false,
    townHallLevel: 7,

    hp: 1805,

    damageData: [
      {
        damagePerHit: 146.4,
      },
    ],
  },
  13: {
    level: 11,
    isMaxLevel: false,
    townHallLevel: 8,

    hp: 1850,

    damageData: [
      {
        damagePerHit: 148.8,
      },
    ],
  },
  14: {
    level: 12,
    isMaxLevel: false,
    townHallLevel: 8,

    hp: 1896,

    damageData: [
      {
        damagePerHit: 152.4,
      },
    ],
  },
  15: {
    level: 13,
    isMaxLevel: false,
    townHallLevel: 8,

    hp: 1943,

    damageData: [
      {
        damagePerHit: 154.8,
      },
    ],
  },
  16: {
    level: 14,
    isMaxLevel: false,
    townHallLevel: 8,

    hp: 1992,

    damageData: [
      {
        damagePerHit: 158.4,
      },
    ],
  },
  17: {
    level: 15,
    isMaxLevel: false,
    townHallLevel: 8,

    hp: 2042,

    damageData: [
      {
        damagePerHit: 160.8,
      },
    ],
  },
  18: {
    level: 16,
    isMaxLevel: false,
    townHallLevel: 8,

    hp: 2093,

    damageData: [
      {
        damagePerHit: 164.4,
      },
    ],
  },
  19: {
    level: 17,
    isMaxLevel: false,
    townHallLevel: 8,

    hp: 2145,

    damageData: [
      {
        damagePerHit: 166.8,
      },
    ],
  },
  20: {
    level: 18,
    isMaxLevel: false,
    townHallLevel: 8,

    hp: 2198,

    damageData: [
      {
        damagePerHit: 171.6,
      },
    ],
  },
  21: {
    level: 19,
    isMaxLevel: false,
    townHallLevel: 8,

    hp: 2253,

    damageData: [
      {
        damagePerHit: 174,
      },
    ],
  },
  22: {
    level: 20,
    isMaxLevel: false,
    townHallLevel: 8,

    hp: 2309,

    damageData: [
      {
        damagePerHit: 177.6,
      },
    ],
  },
  23: {
    level: 21,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 2367,

    damageData: [
      {
        damagePerHit: 181.2,
      },
    ],
  },
  24: {
    level: 22,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 2427,

    damageData: [
      {
        damagePerHit: 184.8,
      },
    ],
  },
  25: {
    level: 23,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 2487,

    damageData: [
      {
        damagePerHit: 188.4,
      },
    ],
  },
  26: {
    level: 24,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 2549,

    damageData: [
      {
        damagePerHit: 193.2,
      },
    ],
  },
  27: {
    level: 25,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 2613,

    damageData: [
      {
        damagePerHit: 196.8,
      },
    ],
  },
  28: {
    level: 26,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 2678,

    damageData: [
      {
        damagePerHit: 200.4,
      },
    ],
  },
  29: {
    level: 27,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 2746,

    damageData: [
      {
        damagePerHit: 204,
      },
    ],
  },
  30: {
    level: 28,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 2814,

    damageData: [
      {
        damagePerHit: 207.6,
      },
    ],
  },
  31: {
    level: 29,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 2885,

    damageData: [
      {
        damagePerHit: 212.4,
      },
    ],
  },
  32: {
    level: 30,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 2956,

    damageData: [
      {
        damagePerHit: 217.2,
      },
    ],
  },
  33: {
    level: 31,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 3030,

    damageData: [
      {
        damagePerHit: 220.8,
      },
    ],
  },
  34: {
    level: 32,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 3107,

    damageData: [
      {
        damagePerHit: 225.6,
      },
    ],
  },
  35: {
    level: 33,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 3184,

    damageData: [
      {
        damagePerHit: 230.4,
      },
    ],
  },
  36: {
    level: 34,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 3264,

    damageData: [
      {
        damagePerHit: 235.2,
      },
    ],
  },
  37: {
    level: 35,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 3346,

    damageData: [
      {
        damagePerHit: 240,
      },
    ],
  },
  38: {
    level: 36,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 3429,

    damageData: [
      {
        damagePerHit: 243.6,
      },
    ],
  },
  39: {
    level: 37,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 3515,

    damageData: [
      {
        damagePerHit: 248.4,
      },
    ],
  },
  40: {
    level: 38,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 3602,

    damageData: [
      {
        damagePerHit: 254.4,
      },
    ],
  },
  41: {
    level: 39,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 3692,

    damageData: [
      {
        damagePerHit: 259.2,
      },
    ],
  },
  42: {
    level: 40,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 3785,

    damageData: [
      {
        damagePerHit: 264,
      },
    ],
  },
  43: {
    level: 41,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 3879,

    damageData: [
      {
        damagePerHit: 280.8,
      },
    ],
  },
  44: {
    level: 42,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 3976,

    damageData: [
      {
        damagePerHit: 286.8,
      },
    ],
  },
  45: {
    level: 43,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 4076,

    damageData: [
      {
        damagePerHit: 292.8,
      },
    ],
  },
  46: {
    level: 44,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 4178,

    damageData: [
      {
        damagePerHit: 298.8,
      },
    ],
  },
  47: {
    level: 45,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 4282,

    damageData: [
      {
        damagePerHit: 304.8,
      },
    ],
  },
  48: {
    level: 46,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 4389,

    damageData: [
      {
        damagePerHit: 310.8,
      },
    ],
  },
  49: {
    level: 47,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 4499,

    damageData: [
      {
        damagePerHit: 318,
      },
    ],
  },
  50: {
    level: 48,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 4611,

    damageData: [
      {
        damagePerHit: 324,
      },
    ],
  },
  51: {
    level: 49,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 4727,

    damageData: [
      {
        damagePerHit: 331.2,
      },
    ],
  },
  52: {
    level: 50,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 4845,

    damageData: [
      {
        damagePerHit: 338.4,
      },
    ],
  },
  53: {
    level: 51,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 4967,

    damageData: [
      {
        damagePerHit: 345.6,
      },
    ],
  },
  54: {
    level: 52,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 5092,

    damageData: [
      {
        damagePerHit: 352.8,
      },
    ],
  },
  55: {
    level: 53,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 5219,

    damageData: [
      {
        damagePerHit: 360,
      },
    ],
  },
  56: {
    level: 54,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 5350,

    damageData: [
      {
        damagePerHit: 368.4,
      },
    ],
  },
  57: {
    level: 55,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 5484,

    damageData: [
      {
        damagePerHit: 376.8,
      },
    ],
  },
  58: {
    level: 56,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 5622,

    damageData: [
      {
        damagePerHit: 384,
      },
    ],
  },
  59: {
    level: 57,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 5763,

    damageData: [
      {
        damagePerHit: 392.4,
      },
    ],
  },
  60: {
    level: 58,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 5908,

    damageData: [
      {
        damagePerHit: 400.8,
      },
    ],
  },
  61: {
    level: 59,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 6055,

    damageData: [
      {
        damagePerHit: 409.2,
      },
    ],
  },
  62: {
    level: 60,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 6208,

    damageData: [
      {
        damagePerHit: 418.8,
      },
    ],
  },
  63: {
    level: 61,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 6363,

    damageData: [
      {
        damagePerHit: 426,
      },
    ],
  },
  64: {
    level: 62,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 6522,

    damageData: [
      {
        damagePerHit: 434.4,
      },
    ],
  },
  65: {
    level: 63,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 6685,

    damageData: [
      {
        damagePerHit: 444,
      },
    ],
  },
  66: {
    level: 64,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 6853,

    damageData: [
      {
        damagePerHit: 452.4,
      },
    ],
  },
  67: {
    level: 65,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 7024,

    damageData: [
      {
        damagePerHit: 462,
      },
    ],
  },
  68: {
    level: 66,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 7200,

    damageData: [
      {
        damagePerHit: 471.6,
      },
    ],
  },
  69: {
    level: 67,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 7378,

    damageData: [
      {
        damagePerHit: 480,
      },
    ],
  },
  70: {
    level: 68,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 7557,

    damageData: [
      {
        damagePerHit: 489.6,
      },
    ],
  },
  71: {
    level: 69,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 7735,

    damageData: [
      {
        damagePerHit: 500.4,
      },
    ],
  },
  72: {
    level: 70,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 7905,

    damageData: [
      {
        damagePerHit: 510,
      },
    ],
  },
  73: {
    level: 71,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 8075,

    damageData: [
      {
        damagePerHit: 520.8,
      },
    ],
  },
  74: {
    level: 72,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 8245,

    damageData: [
      {
        damagePerHit: 530.4,
      },
    ],
  },
  75: {
    level: 73,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 8415,

    damageData: [
      {
        damagePerHit: 541.2,
      },
    ],
  },
  76: {
    level: 74,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 8585,

    damageData: [
      {
        damagePerHit: 550.8,
      },
    ],
  },
  77: {
    level: 75,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 8755,

    damageData: [
      {
        damagePerHit: 561.6,
      },
    ],
  },
  78: {
    level: 76,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 8917,

    damageData: [
      {
        damagePerHit: 570,
      },
    ],
  },
  79: {
    level: 77,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 9078,

    damageData: [
      {
        damagePerHit: 579.6,
      },
    ],
  },
  80: {
    level: 78,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 9240,

    damageData: [
      {
        damagePerHit: 588,
      },
    ],
  },
  81: {
    level: 79,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 9401,

    damageData: [
      {
        damagePerHit: 597.6,
      },
    ],
  },
  82: {
    level: 80,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 9563,

    damageData: [
      {
        damagePerHit: 607.2,
      },
    ],
  },
  83: {
    level: 81,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 9690,

    damageData: [
      {
        damagePerHit: 615.6,
      },
    ],
  },
  84: {
    level: 82,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 9818,

    damageData: [
      {
        damagePerHit: 622.8,
      },
    ],
  },
  85: {
    level: 83,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 9945,

    damageData: [
      {
        damagePerHit: 631.2,
      },
    ],
  },
  86: {
    level: 84,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 10073,

    damageData: [
      {
        damagePerHit: 639.6,
      },
    ],
  },
  87: {
    level: 85,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 10200,

    damageData: [
      {
        damagePerHit: 648,
      },
    ],
  },
  88: {
    level: 86,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 10328,

    damageData: [
      {
        damagePerHit: 656.4,
      },
    ],
  },
  89: {
    level: 87,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 10455,

    damageData: [
      {
        damagePerHit: 663.6,
      },
    ],
  },
  90: {
    level: 88,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 10583,

    damageData: [
      {
        damagePerHit: 672,
      },
    ],
  },
  91: {
    level: 89,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 10710,

    damageData: [
      {
        damagePerHit: 680.4,
      },
    ],
  },
  92: {
    level: 90,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 10838,

    damageData: [
      {
        damagePerHit: 688.8,
      },
    ],
  },
  93: {
    level: 91,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 10965,

    damageData: [
      {
        damagePerHit: 697.2,
      },
    ],
  },
  94: {
    level: 92,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 11093,

    damageData: [
      {
        damagePerHit: 704.4,
      },
    ],
  },
  95: {
    level: 93,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 11220,

    damageData: [
      {
        damagePerHit: 712.8,
      },
    ],
  },
  96: {
    level: 94,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 11348,

    damageData: [
      {
        damagePerHit: 721.2,
      },
    ],
  },
  97: {
    level: 95,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 11475,

    damageData: [
      {
        damagePerHit: 729.6,
      },
    ],
  },
  98: {
    level: 96,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 11600,

    damageData: [
      {
        damagePerHit: 738,
      },
    ],
  },
  99: {
    level: 97,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 11725,

    damageData: [
      {
        damagePerHit: 746.4,
      },
    ],
  },
  100: {
    level: 98,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 11850,

    damageData: [
      {
        damagePerHit: 754.8,
      },
    ],
  },
  101: {
    level: 99,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 11975,

    damageData: [
      {
        damagePerHit: 763.2,
      },
    ],
  },
  102: {
    level: 100,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 12100,

    damageData: [
      {
        damagePerHit: 771.6,
      },
    ],
  },
  103: {
    level: 101,
    isMaxLevel: false,
    townHallLevel: 18,

    hp: 12225,

    damageData: [
      {
        damagePerHit: 780,
      },
    ],
  },
  104: {
    level: 102,
    isMaxLevel: false,
    townHallLevel: 18,

    hp: 12350,

    damageData: [
      {
        damagePerHit: 788.4,
      },
    ],
  },
  105: {
    level: 103,
    isMaxLevel: false,
    townHallLevel: 18,

    hp: 12475,

    damageData: [
      {
        damagePerHit: 796.8,
      },
    ],
  },
  106: {
    level: 104,
    isMaxLevel: false,
    townHallLevel: 18,

    hp: 12600,

    damageData: [
      {
        damagePerHit: 805.2,
      },
    ],
  },
  107: {
    level: 105,
    isMaxLevel: false,
    townHallLevel: 18,

    hp: 12725,

    damageData: [
      {
        damagePerHit: 813.6,
      },
    ],
  },
  108: {
    level: 106,
    isMaxLevel: false,
    townHallLevel: 18,

    hp: 12850,

    damageData: [
      {
        damagePerHit: 822,
      },
    ],
  },
  109: {
    level: 107,
    isMaxLevel: false,
    townHallLevel: 18,

    hp: 12975,

    damageData: [
      {
        damagePerHit: 830.4,
      },
    ],
  },
  110: {
    level: 108,
    isMaxLevel: false,
    townHallLevel: 18,

    hp: 13100,

    damageData: [
      {
        damagePerHit: 838.8,
      },
    ],
  },
  111: {
    level: 109,
    isMaxLevel: false,
    townHallLevel: 18,

    hp: 13225,

    damageData: [
      {
        damagePerHit: 847.2,
      },
    ],
  },
  112: {
    level: 110,
    isMaxLevel: true,
    townHallLevel: 18,

    hp: 13350,

    damageData: [
      {
        damagePerHit: 855.6,
      },
    ],
  },
};

const targetType = [TARGET_TYPE.Ground, TARGET_TYPE.Hero];
const damageType = normalizeOffenseDamageTypes([DAMAGE_TYPE.Direct]);

export const BarbarianKing: HeroData = {
  id: HERO_ID.BarbarianKing,
  targetType: targetType,

  damageType: damageType,
  attackSpeedBetweenHit: 1.2,

  ...normalizeLevelData(barbarianKingRawLevels, (rawLevelData) =>
    normalizeHeroLevelData(rawLevelData, damageType),
  ),

  canAttackAir: false,

  wikiUrl: "https://clashofclans.fandom.com/wiki/Barbarian_King",
};

validateHeroEntityData(BarbarianKing);
