import { normalizeLevelData } from "../shared/baseData.util";
import { DAMAGE_TYPE } from "../shared/offense/damageType";
import { normalizeOffenseDamageTypes } from "../shared/offense/offenseData.util";
import { OFFENSE_MODIFIER_TYPE } from "../shared/offense/offenseModifierType";
import { TARGET_TYPE } from "../shared/target/targetType";
import { type HeroData, type HeroRawLevelData } from "./shared/heroData";
import {
  normalizeHeroLevelData,
  validateHeroEntityData,
} from "./shared/heroData.util";
import { HERO_ID } from "./shared/id";

const dragonDukeRawLevels: Record<number, HeroRawLevelData> = {
  1: {
    level: 1,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 9100,

    damageData: [
      {
        damagePerHit: 364.8,
      },
    ],
  },
  2: {
    level: 2,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 9175,

    damageData: [
      {
        damagePerHit: 369.6,
      },
    ],
  },
  3: {
    level: 3,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 9250,

    damageData: [
      {
        damagePerHit: 374.4,
      },
    ],
  },
  4: {
    level: 4,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 9325,

    damageData: [
      {
        damagePerHit: 379.2,
      },
    ],
  },
  5: {
    level: 5,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 9400,

    damageData: [
      {
        damagePerHit: 384,
      },
    ],
  },
  6: {
    level: 6,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 9475,

    damageData: [
      {
        damagePerHit: 388.8,
      },
    ],
  },
  7: {
    level: 7,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 9550,

    damageData: [
      {
        damagePerHit: 393.6,
      },
    ],
  },
  8: {
    level: 8,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 9625,

    damageData: [
      {
        damagePerHit: 398.4,
      },
    ],
  },
  9: {
    level: 9,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 9700,

    damageData: [
      {
        damagePerHit: 403.2,
      },
    ],
  },
  10: {
    level: 10,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 9775,

    damageData: [
      {
        damagePerHit: 408,
      },
    ],
  },
  11: {
    level: 11,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 9850,

    damageData: [
      {
        damagePerHit: 412.8,
      },
    ],
  },
  12: {
    level: 12,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 9925,

    damageData: [
      {
        damagePerHit: 417.6,
      },
    ],
  },
  13: {
    level: 13,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 10000,

    damageData: [
      {
        damagePerHit: 422.4,
      },
    ],
  },
  14: {
    level: 14,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 10075,

    damageData: [
      {
        damagePerHit: 427.2,
      },
    ],
  },
  15: {
    level: 15,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 10150,

    damageData: [
      {
        damagePerHit: 432,
      },
    ],
  },
  16: {
    level: 16,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 10225,

    damageData: [
      {
        damagePerHit: 436.8,
      },
    ],
  },
  17: {
    level: 17,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 10300,

    damageData: [
      {
        damagePerHit: 441.6,
      },
    ],
  },
  18: {
    level: 18,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 10375,

    damageData: [
      {
        damagePerHit: 446.4,
      },
    ],
  },
  19: {
    level: 19,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 10450,

    damageData: [
      {
        damagePerHit: 451.2,
      },
    ],
  },
  20: {
    level: 20,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 10525,

    damageData: [
      {
        damagePerHit: 456,
      },
    ],
  },
  21: {
    level: 21,
    isMaxLevel: false,
    townHallLevel: 18,

    hp: 10600,

    damageData: [
      {
        damagePerHit: 460.8,
      },
    ],
  },
  22: {
    level: 22,
    isMaxLevel: false,
    townHallLevel: 18,

    hp: 10675,

    damageData: [
      {
        damagePerHit: 465.6,
      },
    ],
  },
  23: {
    level: 23,
    isMaxLevel: false,
    townHallLevel: 18,

    hp: 10750,

    damageData: [
      {
        damagePerHit: 470.4,
      },
    ],
  },
  24: {
    level: 24,
    isMaxLevel: false,
    townHallLevel: 18,

    hp: 10825,

    damageData: [
      {
        damagePerHit: 475.2,
      },
    ],
  },
  25: {
    level: 25,
    isMaxLevel: true,
    townHallLevel: 18,

    hp: 10900,

    damageData: [
      {
        damagePerHit: 480,
      },
    ],
  },
};

const targetType = [TARGET_TYPE.Air, TARGET_TYPE.Hero];
const damageType = normalizeOffenseDamageTypes([DAMAGE_TYPE.Direct]);

export const DragonDuke: HeroData = {
  id: HERO_ID.DragonDuke,
  targetType: targetType,

  damageType: damageType,
  attackSpeedBetweenHit: 1.2,

  ...normalizeLevelData(dragonDukeRawLevels, (rawLevelData) =>
    normalizeHeroLevelData(rawLevelData, damageType),
  ),

  modifiers: [
    {
      modifierType: OFFENSE_MODIFIER_TYPE.RoyalRampage,

      damagePerHitMultiplierInPercentage: 100,
      attackSpeedBetweenHitMultiplierInPercentage: 50,
    },
  ],

  canAttackAir: true,

  wikiUrl: "https://clashofclans.fandom.com/wiki/Dragon_Duke",
};

validateHeroEntityData(DragonDuke);
