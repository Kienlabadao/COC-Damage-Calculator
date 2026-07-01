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

const wizardRawLevels: Record<number, TroopRawLevelData> = {
  1: {
    level: 1,
    isMaxLevel: false,
    townHallLevel: 5,

    hp: 75,

    damageData: [
      {
        damagePerHit: 75,
      },
    ],
  },
  2: {
    level: 2,
    isMaxLevel: false,
    townHallLevel: 5,

    hp: 90,

    damageData: [
      {
        damagePerHit: 105,
      },
    ],
  },
  3: {
    level: 3,
    isMaxLevel: false,
    townHallLevel: 6,

    hp: 108,

    damageData: [
      {
        damagePerHit: 135,
      },
    ],
  },
  4: {
    level: 4,
    isMaxLevel: false,
    townHallLevel: 7,

    hp: 135,

    damageData: [
      {
        damagePerHit: 187.5,
      },
    ],
  },
  5: {
    level: 5,
    isMaxLevel: false,
    townHallLevel: 8,

    hp: 165,

    damageData: [
      {
        damagePerHit: 255,
      },
    ],
  },
  6: {
    level: 6,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 180,

    damageData: [
      {
        damagePerHit: 277.5,
      },
    ],
  },
  7: {
    level: 7,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 195,

    damageData: [
      {
        damagePerHit: 300,
      },
    ],
  },
  8: {
    level: 8,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 210,

    damageData: [
      {
        damagePerHit: 322.5,
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
        damagePerHit: 345,
      },
    ],
  },
  10: {
    level: 10,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 250,

    damageData: [
      {
        damagePerHit: 367.5,
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
        damagePerHit: 390,
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
        damagePerHit: 412.5,
      },
    ],
  },
  13: {
    level: 13,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 310,

    damageData: [
      {
        damagePerHit: 435,
      },
    ],
  },
  14: {
    level: 14,
    isMaxLevel: true,
    townHallLevel: 18,

    hp: 330,

    damageData: [
      {
        damagePerHit: 465,
      },
    ],
  },
};

const targetType = [TARGET_TYPE.Ground, TARGET_TYPE.Troop];
const damageType = normalizeOffenseDamageTypes([DAMAGE_TYPE.Direct]);

export const Wizard: TroopData = {
  id: TROOP_ID.ElixirTroop.Wizard,
  targetType: targetType,

  damageType: damageType,
  attackSpeedBetweenHit: 1.5,

  ...normalizeLevelData(wizardRawLevels, (rawLevelData) =>
    normalizeTroopLevelData(rawLevelData, damageType),
  ),

  canAttackAir: true,

  wikiUrl: "https://clashofclans.fandom.com/wiki/Wizard",
};

validateTroopEntityData(Wizard);
