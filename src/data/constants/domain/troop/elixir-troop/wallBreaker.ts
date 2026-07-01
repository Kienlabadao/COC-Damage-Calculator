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
import { OFFENSE_MODIFIER_TYPE } from "../../shared/offense/offenseModifierType";

const wallBreakerRawLevels: Record<number, TroopRawLevelData> = {
  1: {
    level: 1,
    isMaxLevel: false,
    townHallLevel: 3,

    hp: 20,

    damageData: [
      {
        damagePerHit: 10,
        deathDamage: 6,
      },
    ],
  },
  2: {
    level: 2,
    isMaxLevel: false,
    townHallLevel: 4,

    hp: 24,

    damageData: [
      {
        damagePerHit: 20,
        deathDamage: 9,
      },
    ],
  },
  3: {
    level: 3,
    isMaxLevel: false,
    townHallLevel: 6,

    hp: 29,

    damageData: [
      {
        damagePerHit: 25,
        deathDamage: 13,
      },
    ],
  },
  4: {
    level: 4,
    isMaxLevel: false,
    townHallLevel: 7,

    hp: 35,

    damageData: [
      {
        damagePerHit: 30,
        deathDamage: 16,
      },
    ],
  },
  5: {
    level: 5,
    isMaxLevel: false,
    townHallLevel: 8,

    hp: 53,

    damageData: [
      {
        damagePerHit: 43,
        deathDamage: 23,
      },
    ],
  },
  6: {
    level: 6,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 72,

    damageData: [
      {
        damagePerHit: 55,
        deathDamage: 30,
      },
    ],
  },
  7: {
    level: 7,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 82,

    damageData: [
      {
        damagePerHit: 66,
        deathDamage: 36,
      },
    ],
  },
  8: {
    level: 8,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 92,

    damageData: [
      {
        damagePerHit: 75,
        deathDamage: 42,
      },
    ],
  },
  9: {
    level: 9,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 112,

    damageData: [
      {
        damagePerHit: 86,
        deathDamage: 48,
      },
    ],
  },
  10: {
    level: 10,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 130,

    damageData: [
      {
        damagePerHit: 94,
        deathDamage: 54,
      },
    ],
  },
  11: {
    level: 11,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 140,

    damageData: [
      {
        damagePerHit: 102,
        deathDamage: 60,
      },
    ],
  },
  12: {
    level: 12,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 150,

    damageData: [
      {
        damagePerHit: 110,
        deathDamage: 66,
      },
    ],
  },
  13: {
    level: 13,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 160,

    damageData: [
      {
        damagePerHit: 118,
        deathDamage: 72,
      },
    ],
  },
  14: {
    level: 14,
    isMaxLevel: true,
    townHallLevel: 18,

    hp: 170,

    damageData: [
      {
        damagePerHit: 126,
        deathDamage: 78,
      },
    ],
  },
};

const targetType = [TARGET_TYPE.Ground, TARGET_TYPE.Troop];
const damageType = normalizeOffenseDamageTypes([
  DAMAGE_TYPE.Direct,
  DAMAGE_TYPE.Death,
]);

export const WallBreaker: TroopData = {
  id: TROOP_ID.ElixirTroop.WallBreaker,
  targetType: targetType,

  damageType: damageType,
  attackSpeedBetweenHit: 1,

  ...normalizeLevelData(wallBreakerRawLevels, (rawLevelData) =>
    normalizeTroopLevelData(rawLevelData, damageType),
  ),

  modifiers: [
    {
      modifierType: OFFENSE_MODIFIER_TYPE.PreferenceTarget,
      preferenceTargetType: TARGET_TYPE.Resource,

      damagePerHitMultiplierInPercentage: 100,
    },
  ],

  canAttackAir: false,

  wikiUrl: "https://clashofclans.fandom.com/wiki/Wall_Breaker",
};

validateTroopEntityData(WallBreaker);
