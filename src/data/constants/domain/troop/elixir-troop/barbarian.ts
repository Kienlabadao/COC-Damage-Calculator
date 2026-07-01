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

const barbarianRawLevels: Record<number, TroopRawLevelData> = {
  1: {
    level: 1,
    isMaxLevel: false,
    townHallLevel: 1,

    hp: 45,

    damageData: [
      {
        damagePerHit: 9,
      },
    ],
  },
  2: {
    level: 2,
    isMaxLevel: false,
    townHallLevel: 3,

    hp: 54,

    damageData: [
      {
        damagePerHit: 12,
      },
    ],
  },
  3: {
    level: 3,
    isMaxLevel: false,
    townHallLevel: 5,

    hp: 65,

    damageData: [
      {
        damagePerHit: 15,
      },
    ],
  },
  4: {
    level: 4,
    isMaxLevel: false,
    townHallLevel: 7,

    hp: 85,

    damageData: [
      {
        damagePerHit: 18,
      },
    ],
  },
  5: {
    level: 5,
    isMaxLevel: false,
    townHallLevel: 8,

    hp: 105,

    damageData: [
      {
        damagePerHit: 23,
      },
    ],
  },
  6: {
    level: 6,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 125,

    damageData: [
      {
        damagePerHit: 26,
      },
    ],
  },
  7: {
    level: 7,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 160,

    damageData: [
      {
        damagePerHit: 30,
      },
    ],
  },
  8: {
    level: 8,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 205,

    damageData: [
      {
        damagePerHit: 34,
      },
    ],
  },
  9: {
    level: 9,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 230,

    damageData: [
      {
        damagePerHit: 38,
      },
    ],
  },
  10: {
    level: 10,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 250,

    damageData: [
      {
        damagePerHit: 42,
      },
    ],
  },
  11: {
    level: 11,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 270,

    damageData: [
      {
        damagePerHit: 45,
      },
    ],
  },
  12: {
    level: 12,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 290,

    damageData: [
      {
        damagePerHit: 48,
      },
    ],
  },
  13: {
    level: 13,
    isMaxLevel: true,
    townHallLevel: 18,

    hp: 310,

    damageData: [
      {
        damagePerHit: 51,
      },
    ],
  },
};

const targetType = [TARGET_TYPE.Ground, TARGET_TYPE.Troop];
const damageType = normalizeOffenseDamageTypes([DAMAGE_TYPE.Direct]);

export const Barbarian: TroopData = {
  id: TROOP_ID.ElixirTroop.Barbarian,
  targetType: targetType,

  damageType: damageType,
  attackSpeedBetweenHit: 1,

  ...normalizeLevelData(barbarianRawLevels, (rawLevelData) =>
    normalizeTroopLevelData(rawLevelData, damageType),
  ),

  canAttackAir: false,

  wikiUrl: "https://clashofclans.fandom.com/wiki/Barbarian",
};

validateTroopEntityData(Barbarian);
