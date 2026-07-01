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
import { TROOP_ID } from "../../shared/id/troopId";
import { TROOP_TYPE } from "../shared/troopType";

const bowlerRawLevels: Record<number, TroopRawLevelData> = {
  1: {
    level: 1,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 325,

    damageData: [
      {
        damagePerHit: 132,
      },
    ],
  },
  2: {
    level: 2,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 375,

    damageData: [
      {
        damagePerHit: 158.4,
      },
    ],
  },
  3: {
    level: 3,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 420,

    damageData: [
      {
        damagePerHit: 184.8,
      },
    ],
  },
  4: {
    level: 4,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 470,

    damageData: [
      {
        damagePerHit: 211.2,
      },
    ],
  },
  5: {
    level: 5,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 505,

    damageData: [
      {
        damagePerHit: 224.4,
      },
    ],
  },
  6: {
    level: 6,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 530,

    damageData: [
      {
        damagePerHit: 237.6,
      },
    ],
  },
  7: {
    level: 7,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 565,

    damageData: [
      {
        damagePerHit: 250.8,
      },
    ],
  },
  8: {
    level: 8,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 600,

    damageData: [
      {
        damagePerHit: 277.2,
      },
    ],
  },
  9: {
    level: 9,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 700,

    damageData: [
      {
        damagePerHit: 308,
      },
    ],
  },
  10: {
    level: 10,
    isMaxLevel: true,
    townHallLevel: 18,

    hp: 860,

    damageData: [
      {
        damagePerHit: 352,
      },
    ],
  },
};

const targetType = [TARGET_TYPE.Ground, TARGET_TYPE.Troop];
const damageType = normalizeOffenseDamageTypes([DAMAGE_TYPE.Direct]);

export const Bowler: TroopData = {
  id: TROOP_ID.DarkElixirTroop.Bowler,
  troopType: [TROOP_TYPE.DarkElixir],

  targetType: targetType,

  damageType: damageType,
  attackSpeedBetweenHit: 2.2,

  ...normalizeLevelData(bowlerRawLevels, (rawLevelData) =>
    normalizeTroopLevelData(rawLevelData, damageType),
  ),

  canAttackAir: false,

  wikiUrl: "https://clashofclans.fandom.com/wiki/Bowler",
};

validateTroopEntityData(Bowler);
