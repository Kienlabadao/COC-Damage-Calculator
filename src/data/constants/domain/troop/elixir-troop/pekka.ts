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

const pekkaRawLevels: Record<number, TroopRawLevelData> = {
  1: {
    level: 1,
    isMaxLevel: false,
    townHallLevel: 8,

    hp: 3000,

    damageData: [
      {
        damagePerHit: 468,
      },
    ],
  },
  2: {
    level: 2,
    isMaxLevel: false,
    townHallLevel: 8,

    hp: 3500,

    damageData: [
      {
        damagePerHit: 522,
      },
    ],
  },
  3: {
    level: 3,
    isMaxLevel: false,
    townHallLevel: 8,

    hp: 4000,

    damageData: [
      {
        damagePerHit: 576,
      },
    ],
  },
  4: {
    level: 4,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 4500,

    damageData: [
      {
        damagePerHit: 648,
      },
    ],
  },
  5: {
    level: 5,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 5000,

    damageData: [
      {
        damagePerHit: 738,
      },
    ],
  },
  6: {
    level: 6,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 5500,

    damageData: [
      {
        damagePerHit: 846,
      },
    ],
  },
  7: {
    level: 7,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 5900,

    damageData: [
      {
        damagePerHit: 972,
      },
    ],
  },
  8: {
    level: 8,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 6300,

    damageData: [
      {
        damagePerHit: 1098,
      },
    ],
  },
  9: {
    level: 9,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 6700,

    damageData: [
      {
        damagePerHit: 1224,
      },
    ],
  },
  10: {
    level: 10,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 7200,

    damageData: [
      {
        damagePerHit: 1350,
      },
    ],
  },
  11: {
    level: 11,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 7700,

    damageData: [
      {
        damagePerHit: 1458,
      },
    ],
  },
  12: {
    level: 12,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 8200,

    damageData: [
      {
        damagePerHit: 1566,
      },
    ],
  },
  13: {
    level: 13,
    isMaxLevel: true,
    townHallLevel: 18,

    hp: 8800,

    damageData: [
      {
        damagePerHit: 1692,
      },
    ],
  },
};

const targetType = [TARGET_TYPE.Ground, TARGET_TYPE.Troop];
const damageType = normalizeOffenseDamageTypes([DAMAGE_TYPE.Direct]);

export const Pekka: TroopData = {
  id: TROOP_ID.ElixirTroop.Pekka,
  targetType: targetType,

  damageType: damageType,
  attackSpeedBetweenHit: 1.8,

  ...normalizeLevelData(pekkaRawLevels, (rawLevelData) =>
    normalizeTroopLevelData(rawLevelData, damageType),
  ),

  canAttackAir: false,

  wikiUrl: "https://clashofclans.fandom.com/wiki/P.E.K.K.A",
};

validateTroopEntityData(Pekka);
