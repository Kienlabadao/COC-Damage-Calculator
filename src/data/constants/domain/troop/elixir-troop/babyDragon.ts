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

const babyDragonRawLevels: Record<number, TroopRawLevelData> = {
  1: {
    level: 1,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 1200,

    damageData: [
      {
        damagePerHit: 75,
      },
    ],
  },
  2: {
    level: 2,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 1300,

    damageData: [
      {
        damagePerHit: 85,
      },
    ],
  },
  3: {
    level: 3,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 1400,

    damageData: [
      {
        damagePerHit: 95,
      },
    ],
  },
  4: {
    level: 4,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 1500,

    damageData: [
      {
        damagePerHit: 105,
      },
    ],
  },
  5: {
    level: 5,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 1600,

    damageData: [
      {
        damagePerHit: 115,
      },
    ],
  },
  6: {
    level: 6,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 1700,

    damageData: [
      {
        damagePerHit: 125,
      },
    ],
  },
  7: {
    level: 7,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 1800,

    damageData: [
      {
        damagePerHit: 135,
      },
    ],
  },
  8: {
    level: 8,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 1900,

    damageData: [
      {
        damagePerHit: 145,
      },
    ],
  },
  9: {
    level: 9,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 2000,

    damageData: [
      {
        damagePerHit: 155,
      },
    ],
  },
  10: {
    level: 10,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 2100,

    damageData: [
      {
        damagePerHit: 165,
      },
    ],
  },
  11: {
    level: 11,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 2200,

    damageData: [
      {
        damagePerHit: 175,
      },
    ],
  },
  12: {
    level: 12,
    isMaxLevel: true,
    townHallLevel: 18,

    hp: 2350,

    damageData: [
      {
        damagePerHit: 185,
      },
    ],
  },
};

const targetType = [TARGET_TYPE.Air, TARGET_TYPE.Troop];
const damageType = normalizeOffenseDamageTypes([DAMAGE_TYPE.Direct]);

export const BabyDragon: TroopData = {
  id: TROOP_ID.ElixirTroop.BabyDragon,
  targetType: targetType,

  damageType: damageType,
  attackSpeedBetweenHit: 1,

  ...normalizeLevelData(babyDragonRawLevels, (rawLevelData) =>
    normalizeTroopLevelData(rawLevelData, damageType),
  ),

  modifiers: [
    {
      modifierType: OFFENSE_MODIFIER_TYPE.Tantrum,

      damagePerHitMultiplierInPercentage: 100,
      attackSpeedBetweenHitMultiplierInPercentage: 50,
    },
  ],

  canAttackAir: true,

  wikiUrl: "https://clashofclans.fandom.com/wiki/Baby_Dragon/Home_Village",
};

validateTroopEntityData(BabyDragon);
