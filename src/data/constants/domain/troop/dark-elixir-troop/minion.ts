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

const minionRawLevels: Record<number, TroopRawLevelData> = {
  1: {
    level: 1,
    isMaxLevel: false,
    townHallLevel: 7,

    hp: 58,

    damageData: [
      {
        damagePerHit: 38,
      },
    ],
  },
  2: {
    level: 2,
    isMaxLevel: false,
    townHallLevel: 7,

    hp: 63,

    damageData: [
      {
        damagePerHit: 41,
      },
    ],
  },
  3: {
    level: 3,
    isMaxLevel: false,
    townHallLevel: 8,

    hp: 68,

    damageData: [
      {
        damagePerHit: 44,
      },
    ],
  },
  4: {
    level: 4,
    isMaxLevel: false,
    townHallLevel: 8,

    hp: 73,

    damageData: [
      {
        damagePerHit: 47,
      },
    ],
  },
  5: {
    level: 5,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 78,

    damageData: [
      {
        damagePerHit: 50,
      },
    ],
  },
  6: {
    level: 6,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 84,

    damageData: [
      {
        damagePerHit: 54,
      },
    ],
  },
  7: {
    level: 7,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 90,

    damageData: [
      {
        damagePerHit: 58,
      },
    ],
  },
  8: {
    level: 8,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 96,

    damageData: [
      {
        damagePerHit: 62,
      },
    ],
  },
  9: {
    level: 9,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 102,

    damageData: [
      {
        damagePerHit: 66,
      },
    ],
  },
  10: {
    level: 10,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 108,

    damageData: [
      {
        damagePerHit: 70,
      },
    ],
  },
  11: {
    level: 11,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 114,

    damageData: [
      {
        damagePerHit: 74,
      },
    ],
  },
  12: {
    level: 12,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 120,

    damageData: [
      {
        damagePerHit: 78,
      },
    ],
  },
  13: {
    level: 13,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 130,

    damageData: [
      {
        damagePerHit: 84,
      },
    ],
  },
  14: {
    level: 14,
    isMaxLevel: true,
    townHallLevel: 18,

    hp: 140,

    damageData: [
      {
        damagePerHit: 92,
      },
    ],
  },
};

const targetType = [TARGET_TYPE.Air, TARGET_TYPE.Troop];
const damageType = normalizeOffenseDamageTypes([DAMAGE_TYPE.Direct]);

export const Minion: TroopData = {
  id: TROOP_ID.DarkElixirTroop.Minion,
  targetType: targetType,

  damageType: damageType,
  attackSpeedBetweenHit: 1,

  ...normalizeLevelData(minionRawLevels, (rawLevelData) =>
    normalizeTroopLevelData(rawLevelData, damageType),
  ),

  canAttackAir: true,

  wikiUrl: "https://clashofclans.fandom.com/wiki/Minion",
};

validateTroopEntityData(Minion);
