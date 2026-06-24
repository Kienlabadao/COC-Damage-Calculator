import { DAMAGE_TYPE, OFFENSE_TYPE } from "../../shared";
import {
  OFFENSE_ID,
  OFFENSE_MODIFIER_TYPE,
  type OffenseData,
} from "../offenseShared";

export const DragonDuke: OffenseData = {
  id: OFFENSE_ID.Hero.DragonDuke,
  type: OFFENSE_TYPE.Hero,

  damageType: DAMAGE_TYPE.Direct,
  attackSpeedBetweenHit: 1.2,

  levels: {
    1: {
      level: 1,
      isMaxLevel: false,
      townHallLevel: 15,

      damagePerHit: 364.8,
    },
    2: {
      level: 2,
      isMaxLevel: false,
      townHallLevel: 15,

      damagePerHit: 369.6,
    },
    3: {
      level: 3,
      isMaxLevel: false,
      townHallLevel: 15,

      damagePerHit: 374.4,
    },
    4: {
      level: 4,
      isMaxLevel: false,
      townHallLevel: 15,

      damagePerHit: 379.2,
    },
    5: {
      level: 5,
      isMaxLevel: false,
      townHallLevel: 15,

      damagePerHit: 384,
    },
    6: {
      level: 6,
      isMaxLevel: false,
      townHallLevel: 15,

      damagePerHit: 388.8,
    },
    7: {
      level: 7,
      isMaxLevel: false,
      townHallLevel: 15,

      damagePerHit: 393.6,
    },
    8: {
      level: 8,
      isMaxLevel: false,
      townHallLevel: 15,

      damagePerHit: 398.4,
    },
    9: {
      level: 9,
      isMaxLevel: false,
      townHallLevel: 15,

      damagePerHit: 403.2,
    },
    10: {
      level: 10,
      isMaxLevel: false,
      townHallLevel: 15,

      damagePerHit: 408,
    },
    11: {
      level: 11,
      isMaxLevel: false,
      townHallLevel: 16,

      damagePerHit: 412.8,
    },
    12: {
      level: 12,
      isMaxLevel: false,
      townHallLevel: 16,

      damagePerHit: 417.6,
    },
    13: {
      level: 13,
      isMaxLevel: false,
      townHallLevel: 16,

      damagePerHit: 422.4,
    },
    14: {
      level: 14,
      isMaxLevel: false,
      townHallLevel: 16,

      damagePerHit: 427.2,
    },
    15: {
      level: 15,
      isMaxLevel: false,
      townHallLevel: 16,

      damagePerHit: 432,
    },
    16: {
      level: 16,
      isMaxLevel: false,
      townHallLevel: 17,

      damagePerHit: 436.8,
    },
    17: {
      level: 17,
      isMaxLevel: false,
      townHallLevel: 17,

      damagePerHit: 441.6,
    },
    18: {
      level: 18,
      isMaxLevel: false,
      townHallLevel: 17,

      damagePerHit: 446.4,
    },
    19: {
      level: 19,
      isMaxLevel: false,
      townHallLevel: 17,

      damagePerHit: 451.2,
    },
    20: {
      level: 20,
      isMaxLevel: false,
      townHallLevel: 17,

      damagePerHit: 456,
    },
    21: {
      level: 21,
      isMaxLevel: false,
      townHallLevel: 18,

      damagePerHit: 460.8,
    },
    22: {
      level: 22,
      isMaxLevel: false,
      townHallLevel: 18,

      damagePerHit: 465.6,
    },
    23: {
      level: 23,
      isMaxLevel: false,
      townHallLevel: 18,

      damagePerHit: 470.4,
    },
    24: {
      level: 24,
      isMaxLevel: false,
      townHallLevel: 18,

      damagePerHit: 475.2,
    },
    25: {
      level: 25,
      isMaxLevel: true,
      townHallLevel: 18,

      damagePerHit: 480,
    },
  },

  modifiers: [
    {
      modifierType: OFFENSE_MODIFIER_TYPE.Alone,

      damagePerHitMultiplierInPercentage: 100,
      attackSpeedBetweenHitMultiplierInPercentage: 50,
    },
  ],

  canDealDeathDamage: false,
  canDealAuraDamage: false,
  haveSeparateWallDamage: false,
  haveStageDamage: false,
  canDealPointBlankDamage: false,

  canDealChainDamage: false,

  canDealPoisonDamage: false,

  isTemporary: false,

  wikiUrl: "https://clashofclans.fandom.com/wiki/Dragon_Duke",
};
