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

const goblinRawLevels: Record<number, TroopRawLevelData> = {
  1: {
    level: 1,
    isMaxLevel: false,
    townHallLevel: 3,

    hp: 25,

    damageData: [
      {
        damagePerHit: 11,
      },
    ],
  },
  2: {
    level: 2,
    isMaxLevel: false,
    townHallLevel: 3,

    hp: 30,

    damageData: [
      {
        damagePerHit: 14,
      },
    ],
  },
  3: {
    level: 3,
    isMaxLevel: false,
    townHallLevel: 5,

    hp: 36,

    damageData: [
      {
        damagePerHit: 19,
      },
    ],
  },
  4: {
    level: 4,
    isMaxLevel: false,
    townHallLevel: 7,

    hp: 50,

    damageData: [
      {
        damagePerHit: 24,
      },
    ],
  },
  5: {
    level: 5,
    isMaxLevel: false,
    townHallLevel: 8,

    hp: 65,

    damageData: [
      {
        damagePerHit: 32,
      },
    ],
  },
  6: {
    level: 6,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 80,

    damageData: [
      {
        damagePerHit: 42,
      },
    ],
  },
  7: {
    level: 7,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 105,

    damageData: [
      {
        damagePerHit: 52,
      },
    ],
  },
  8: {
    level: 8,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 126,

    damageData: [
      {
        damagePerHit: 62,
      },
    ],
  },
  9: {
    level: 9,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 146,

    damageData: [
      {
        damagePerHit: 72,
      },
    ],
  },
  10: {
    level: 10,
    isMaxLevel: true,
    townHallLevel: 18,

    hp: 166,

    damageData: [
      {
        damagePerHit: 82,
      },
    ],
  },
};

const targetType = [TARGET_TYPE.Ground, TARGET_TYPE.Troop];
const damageType = normalizeOffenseDamageTypes([DAMAGE_TYPE.Direct]);

export const Goblin: TroopData = {
  id: TROOP_ID.ElixirTroop.Goblin,
  targetType: targetType,

  damageType: damageType,
  attackSpeedBetweenHit: 1,

  ...normalizeLevelData(goblinRawLevels, (rawLevelData) =>
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

  wikiUrl: "https://clashofclans.fandom.com/wiki/Goblin",
};

validateTroopEntityData(Goblin);
