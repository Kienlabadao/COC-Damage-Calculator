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

const minerRawLevels: Record<number, TroopRawLevelData> = {
  1: {
    level: 1,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 550,

    damageData: [
      {
        damagePerHit: 136,
      },
    ],
  },
  2: {
    level: 2,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 610,

    damageData: [
      {
        damagePerHit: 149.6,
      },
    ],
  },
  3: {
    level: 3,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 670,

    damageData: [
      {
        damagePerHit: 163.2,
      },
    ],
  },
  4: {
    level: 4,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 730,

    damageData: [
      {
        damagePerHit: 176.8,
      },
    ],
  },
  5: {
    level: 5,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 800,

    damageData: [
      {
        damagePerHit: 190.4,
      },
    ],
  },
  6: {
    level: 6,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 900,

    damageData: [
      {
        damagePerHit: 204,
      },
    ],
  },
  7: {
    level: 7,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 1000,

    damageData: [
      {
        damagePerHit: 217.6,
      },
    ],
  },
  8: {
    level: 8,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 1150,

    damageData: [
      {
        damagePerHit: 231.2,
      },
    ],
  },
  9: {
    level: 9,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 1350,

    damageData: [
      {
        damagePerHit: 244.8,
      },
    ],
  },
  10: {
    level: 10,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 1550,

    damageData: [
      {
        damagePerHit: 272,
      },
    ],
  },
  11: {
    level: 11,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 1750,

    damageData: [
      {
        damagePerHit: 297.5,
      },
    ],
  },
  12: {
    level: 12,
    isMaxLevel: true,
    townHallLevel: 18,

    hp: 2050,

    damageData: [
      {
        damagePerHit: 331.5,
      },
    ],
  },
};

const targetType = [TARGET_TYPE.Ground, TARGET_TYPE.Troop];
const damageType = normalizeOffenseDamageTypes([DAMAGE_TYPE.Direct]);

export const Miner: TroopData = {
  id: TROOP_ID.ElixirTroop.Miner,
  targetType: targetType,

  damageType: damageType,
  attackSpeedBetweenHit: 1.7,

  ...normalizeLevelData(minerRawLevels, (rawLevelData) =>
    normalizeTroopLevelData(rawLevelData, damageType),
  ),

  canAttackAir: false,

  wikiUrl: "https://clashofclans.fandom.com/wiki/Miner",
};

validateTroopEntityData(Miner);
