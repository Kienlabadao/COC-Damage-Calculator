import { normalizeLevelData } from "../shared/baseData";
import { DAMAGE_TYPE } from "../shared/offense/damageType";
import {
  normalizeHeroLevelData,
  type HeroData,
  type HeroRawLevelData,
} from "./shared/heroData";
import { HERO_ID } from "./shared/id";

const royalChampionRawLevels: Record<number, HeroRawLevelData> = {
  1: {
    level: 1,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 2508,

    damageData: [
      {
        damagePerHit: 408,
      },
    ],
  },
  2: {
    level: 2,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 2550,

    damageData: [
      {
        damagePerHit: 420,
      },
    ],
  },
  3: {
    level: 3,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 2593,

    damageData: [
      {
        damagePerHit: 432,
      },
    ],
  },
  4: {
    level: 4,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 2635,

    damageData: [
      {
        damagePerHit: 444,
      },
    ],
  },
  5: {
    level: 5,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 2678,

    damageData: [
      {
        damagePerHit: 450,
      },
    ],
  },
  6: {
    level: 6,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 2720,

    damageData: [
      {
        damagePerHit: 456,
      },
    ],
  },
  7: {
    level: 7,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 2763,

    damageData: [
      {
        damagePerHit: 462,
      },
    ],
  },
  8: {
    level: 8,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 2805,

    damageData: [
      {
        damagePerHit: 468,
      },
    ],
  },
  9: {
    level: 9,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 2848,

    damageData: [
      {
        damagePerHit: 475.2,
      },
    ],
  },
  10: {
    level: 10,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 2890,

    damageData: [
      {
        damagePerHit: 482.4,
      },
    ],
  },
  11: {
    level: 11,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 2933,

    damageData: [
      {
        damagePerHit: 489.6,
      },
    ],
  },
  12: {
    level: 12,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 2975,

    damageData: [
      {
        damagePerHit: 496.8,
      },
    ],
  },
  13: {
    level: 13,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 3018,

    damageData: [
      {
        damagePerHit: 504,
      },
    ],
  },
  14: {
    level: 14,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 3060,

    damageData: [
      {
        damagePerHit: 511.2,
      },
    ],
  },
  15: {
    level: 15,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 3103,

    damageData: [
      {
        damagePerHit: 518.4,
      },
    ],
  },
  16: {
    level: 16,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 3145,

    damageData: [
      {
        damagePerHit: 525.6,
      },
    ],
  },
  17: {
    level: 17,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 3188,

    damageData: [
      {
        damagePerHit: 532.8,
      },
    ],
  },
  18: {
    level: 18,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 3230,

    damageData: [
      {
        damagePerHit: 537.6,
      },
    ],
  },
  19: {
    level: 19,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 3273,

    damageData: [
      {
        damagePerHit: 542.4,
      },
    ],
  },
  20: {
    level: 20,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 3315,

    damageData: [
      {
        damagePerHit: 547.2,
      },
    ],
  },
  21: {
    level: 21,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 3349,

    damageData: [
      {
        damagePerHit: 552,
      },
    ],
  },
  22: {
    level: 22,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 3383,

    damageData: [
      {
        damagePerHit: 558,
      },
    ],
  },
  23: {
    level: 23,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 3417,

    damageData: [
      {
        damagePerHit: 564,
      },
    ],
  },
  24: {
    level: 24,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 3451,

    damageData: [
      {
        damagePerHit: 568.8,
      },
    ],
  },
  25: {
    level: 25,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 3485,

    damageData: [
      {
        damagePerHit: 572.4,
      },
    ],
  },
  26: {
    level: 26,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 3519,

    damageData: [
      {
        damagePerHit: 576,
      },
    ],
  },
  27: {
    level: 27,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 3553,

    damageData: [
      {
        damagePerHit: 579.6,
      },
    ],
  },
  28: {
    level: 28,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 3587,

    damageData: [
      {
        damagePerHit: 583.2,
      },
    ],
  },
  29: {
    level: 29,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 3621,

    damageData: [
      {
        damagePerHit: 586.8,
      },
    ],
  },
  30: {
    level: 30,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 3655,

    damageData: [
      {
        damagePerHit: 590.4,
      },
    ],
  },
  31: {
    level: 31,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 3681,

    damageData: [
      {
        damagePerHit: 594,
      },
    ],
  },
  32: {
    level: 32,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 3706,

    damageData: [
      {
        damagePerHit: 597.6,
      },
    ],
  },
  33: {
    level: 33,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 3732,

    damageData: [
      {
        damagePerHit: 602.4,
      },
    ],
  },
  34: {
    level: 34,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 3757,

    damageData: [
      {
        damagePerHit: 607.2,
      },
    ],
  },
  35: {
    level: 35,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 3783,

    damageData: [
      {
        damagePerHit: 612,
      },
    ],
  },
  36: {
    level: 36,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 3808,

    damageData: [
      {
        damagePerHit: 616.8,
      },
    ],
  },
  37: {
    level: 37,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 3834,

    damageData: [
      {
        damagePerHit: 621.6,
      },
    ],
  },
  38: {
    level: 38,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 3859,

    damageData: [
      {
        damagePerHit: 626.4,
      },
    ],
  },
  39: {
    level: 39,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 3885,

    damageData: [
      {
        damagePerHit: 631.2,
      },
    ],
  },
  40: {
    level: 40,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 3910,

    damageData: [
      {
        damagePerHit: 636,
      },
    ],
  },
  41: {
    level: 41,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 3936,

    damageData: [
      {
        damagePerHit: 639.6,
      },
    ],
  },
  42: {
    level: 42,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 3961,

    damageData: [
      {
        damagePerHit: 643.2,
      },
    ],
  },
  43: {
    level: 43,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 3987,

    damageData: [
      {
        damagePerHit: 646.8,
      },
    ],
  },
  44: {
    level: 44,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 4012,

    damageData: [
      {
        damagePerHit: 650.4,
      },
    ],
  },
  45: {
    level: 45,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 4038,

    damageData: [
      {
        damagePerHit: 654,
      },
    ],
  },
  46: {
    level: 46,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 4064,

    damageData: [
      {
        damagePerHit: 657.6,
      },
    ],
  },
  47: {
    level: 47,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 4090,

    damageData: [
      {
        damagePerHit: 661.2,
      },
    ],
  },
  48: {
    level: 48,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 4116,

    damageData: [
      {
        damagePerHit: 664.8,
      },
    ],
  },
  49: {
    level: 49,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 4142,

    damageData: [
      {
        damagePerHit: 668.4,
      },
    ],
  },
  50: {
    level: 50,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 4168,

    damageData: [
      {
        damagePerHit: 672,
      },
    ],
  },
  51: {
    level: 51,
    isMaxLevel: false,
    townHallLevel: 18,

    hp: 4194,

    damageData: [
      {
        damagePerHit: 675.6,
      },
    ],
  },
  52: {
    level: 52,
    isMaxLevel: false,
    townHallLevel: 18,

    hp: 4220,

    damageData: [
      {
        damagePerHit: 679.2,
      },
    ],
  },
  53: {
    level: 53,
    isMaxLevel: false,
    townHallLevel: 18,

    hp: 4246,

    damageData: [
      {
        damagePerHit: 682.8,
      },
    ],
  },
  54: {
    level: 54,
    isMaxLevel: false,
    townHallLevel: 18,

    hp: 4272,

    damageData: [
      {
        damagePerHit: 686.4,
      },
    ],
  },
  55: {
    level: 55,
    isMaxLevel: true,
    townHallLevel: 18,

    hp: 4298,

    damageData: [
      {
        damagePerHit: 690,
      },
    ],
  },
};

export const RoyalChampion: HeroData = {
  id: HERO_ID.RoyalChampion,

  damageType: DAMAGE_TYPE.Direct,
  attackSpeedBetweenHit: 1.2,

  ...normalizeLevelData(royalChampionRawLevels, normalizeHeroLevelData),

  canDealDeathDamage: false,
  canDealAuraDamage: false,
  haveSeparateWallDamage: false,
  haveStageDamage: false,
  canDealPointBlankDamage: false,

  canDealChainDamage: false,

  canDealPoisonDamage: false,

  isTemporary: false,

  wikiUrl: "https://clashofclans.fandom.com/wiki/Royal_Champion",
};
