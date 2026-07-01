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

const golemRawLevels: Record<number, TroopRawLevelData> = {
  1: {
    level: 1,
    isMaxLevel: false,
    townHallLevel: 8,

    hp: 5100,

    damageData: [
      {
        damagePerHit: 84,
        deathDamage: 350,
      },
    ],
  },
  2: {
    level: 2,
    isMaxLevel: false,
    townHallLevel: 8,

    hp: 5400,

    damageData: [
      {
        damagePerHit: 96,
        deathDamage: 400,
      },
    ],
  },
  3: {
    level: 3,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 5700,

    damageData: [
      {
        damagePerHit: 108,
        deathDamage: 450,
      },
    ],
  },
  4: {
    level: 4,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 6000,

    damageData: [
      {
        damagePerHit: 120,
        deathDamage: 500,
      },
    ],
  },
  5: {
    level: 5,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 6300,

    damageData: [
      {
        damagePerHit: 132,
        deathDamage: 550,
      },
    ],
  },
  6: {
    level: 6,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 6600,

    damageData: [
      {
        damagePerHit: 144,
        deathDamage: 600,
      },
    ],
  },
  7: {
    level: 7,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 7000,

    damageData: [
      {
        damagePerHit: 156,
        deathDamage: 650,
      },
    ],
  },
  8: {
    level: 8,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 7500,

    damageData: [
      {
        damagePerHit: 168,
        deathDamage: 700,
      },
    ],
  },
  9: {
    level: 9,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 7900,

    damageData: [
      {
        damagePerHit: 180,
        deathDamage: 750,
      },
    ],
  },
  10: {
    level: 10,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 8200,

    damageData: [
      {
        damagePerHit: 192,
        deathDamage: 800,
      },
    ],
  },
  11: {
    level: 11,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 8500,

    damageData: [
      {
        damagePerHit: 204,
        deathDamage: 850,
      },
    ],
  },
  12: {
    level: 12,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 8800,

    damageData: [
      {
        damagePerHit: 216,
        deathDamage: 900,
      },
    ],
  },
  13: {
    level: 13,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 9200,

    damageData: [
      {
        damagePerHit: 228,
        deathDamage: 950,
      },
    ],
  },
  14: {
    level: 14,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 9600,

    damageData: [
      {
        damagePerHit: 240,
        deathDamage: 1000,
      },
    ],
  },
  15: {
    level: 15,
    isMaxLevel: true,
    townHallLevel: 18,

    hp: 10600,

    damageData: [
      {
        damagePerHit: 288,
        deathDamage: 1050,
      },
    ],
  },
};

const targetType = [TARGET_TYPE.Ground, TARGET_TYPE.Troop];
const damageType = normalizeOffenseDamageTypes([
  DAMAGE_TYPE.Direct,
  DAMAGE_TYPE.Death,
]);

export const Golem: TroopData = {
  id: TROOP_ID.DarkElixirTroop.Golem,
  troopType: [TROOP_TYPE.DarkElixir],

  targetType: targetType,

  damageType: damageType,
  attackSpeedBetweenHit: 2.4,

  ...normalizeLevelData(golemRawLevels, (rawLevelData) =>
    normalizeTroopLevelData(rawLevelData, damageType),
  ),

  canAttackAir: false,

  wikiUrl: "https://clashofclans.fandom.com/wiki/Golem",
};

validateTroopEntityData(Golem);
