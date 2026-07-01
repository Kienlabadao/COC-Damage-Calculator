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

const balloonRawLevels: Record<number, TroopRawLevelData> = {
  1: {
    level: 1,
    isMaxLevel: false,
    townHallLevel: 4,

    hp: 150,

    damageData: [
      {
        damagePerHit: 75,
        deathDamage: 25,
      },
    ],
  },
  2: {
    level: 2,
    isMaxLevel: false,
    townHallLevel: 4,

    hp: 180,

    damageData: [
      {
        damagePerHit: 96,
        deathDamage: 32,
      },
    ],
  },
  3: {
    level: 3,
    isMaxLevel: false,
    townHallLevel: 6,

    hp: 216,

    damageData: [
      {
        damagePerHit: 144,
        deathDamage: 48,
      },
    ],
  },
  4: {
    level: 4,
    isMaxLevel: false,
    townHallLevel: 7,

    hp: 280,

    damageData: [
      {
        damagePerHit: 216,
        deathDamage: 72,
      },
    ],
  },
  5: {
    level: 5,
    isMaxLevel: false,
    townHallLevel: 8,

    hp: 390,

    damageData: [
      {
        damagePerHit: 324,
        deathDamage: 108,
      },
    ],
  },
  6: {
    level: 6,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 545,

    damageData: [
      {
        damagePerHit: 486,
        deathDamage: 162,
      },
    ],
  },
  7: {
    level: 7,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 690,

    damageData: [
      {
        damagePerHit: 594,
        deathDamage: 214,
      },
    ],
  },
  8: {
    level: 8,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 840,

    damageData: [
      {
        damagePerHit: 708,
        deathDamage: 268,
      },
    ],
  },
  9: {
    level: 9,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 940,

    damageData: [
      {
        damagePerHit: 768,
        deathDamage: 322,
      },
    ],
  },
  10: {
    level: 10,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 1040,

    damageData: [
      {
        damagePerHit: 828,
        deathDamage: 352,
      },
    ],
  },
  11: {
    level: 11,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 1140,

    damageData: [
      {
        damagePerHit: 870,
        deathDamage: 375,
      },
    ],
  },
  12: {
    level: 12,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 1240,

    damageData: [
      {
        damagePerHit: 912,
        deathDamage: 398,
      },
    ],
  },
  13: {
    level: 13,
    isMaxLevel: true,
    townHallLevel: 18,

    hp: 1360,

    damageData: [
      {
        damagePerHit: 978,
        deathDamage: 425,
      },
    ],
  },
};

const targetType = [TARGET_TYPE.Air, TARGET_TYPE.Troop];
const damageType = normalizeOffenseDamageTypes([
  DAMAGE_TYPE.Direct,
  DAMAGE_TYPE.Death,
]);

export const Balloon: TroopData = {
  id: TROOP_ID.ElixirTroop.Balloon,
  troopType: [TROOP_TYPE.Elixir],

  targetType: targetType,

  damageType: damageType,
  attackSpeedBetweenHit: 3,

  ...normalizeLevelData(balloonRawLevels, (rawLevelData) =>
    normalizeTroopLevelData(rawLevelData, damageType),
  ),

  canAttackAir: false,

  wikiUrl: "https://clashofclans.fandom.com/wiki/Balloon",
};

validateTroopEntityData(Balloon);
