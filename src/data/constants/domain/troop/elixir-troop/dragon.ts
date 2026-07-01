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

const dragonRawLevels: Record<number, TroopRawLevelData> = {
  1: {
    level: 1,
    isMaxLevel: false,
    townHallLevel: 7,

    hp: 1900,

    damageData: [
      {
        damagePerHit: 175,
      },
    ],
  },
  2: {
    level: 2,
    isMaxLevel: false,
    townHallLevel: 7,

    hp: 2100,

    damageData: [
      {
        damagePerHit: 200,
      },
    ],
  },
  3: {
    level: 3,
    isMaxLevel: false,
    townHallLevel: 8,

    hp: 2300,

    damageData: [
      {
        damagePerHit: 225,
      },
    ],
  },
  4: {
    level: 4,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 2700,

    damageData: [
      {
        damagePerHit: 262.5,
      },
    ],
  },
  5: {
    level: 5,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 3100,

    damageData: [
      {
        damagePerHit: 300,
      },
    ],
  },
  6: {
    level: 6,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 3400,

    damageData: [
      {
        damagePerHit: 337.5,
      },
    ],
  },
  7: {
    level: 7,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 3900,

    damageData: [
      {
        damagePerHit: 387.5,
      },
    ],
  },
  8: {
    level: 8,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 4200,

    damageData: [
      {
        damagePerHit: 412.5,
      },
    ],
  },
  9: {
    level: 9,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 4500,

    damageData: [
      {
        damagePerHit: 437.5,
      },
    ],
  },
  10: {
    level: 10,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 4900,

    damageData: [
      {
        damagePerHit: 462.5,
      },
    ],
  },
  11: {
    level: 11,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 5300,

    damageData: [
      {
        damagePerHit: 487.5,
      },
    ],
  },
  12: {
    level: 12,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 5700,

    damageData: [
      {
        damagePerHit: 512.5,
      },
    ],
  },
  13: {
    level: 13,
    isMaxLevel: true,
    townHallLevel: 18,

    hp: 6000,

    damageData: [
      {
        damagePerHit: 537.5,
      },
    ],
  },
};

const targetType = [TARGET_TYPE.Air, TARGET_TYPE.Troop];
const damageType = normalizeOffenseDamageTypes([DAMAGE_TYPE.Direct]);

export const Dragon: TroopData = {
  id: TROOP_ID.ElixirTroop.Dragon,
  troopType: [TROOP_TYPE.Elixir],

  targetType: targetType,

  damageType: damageType,
  attackSpeedBetweenHit: 1.25,

  ...normalizeLevelData(dragonRawLevels, (rawLevelData) =>
    normalizeTroopLevelData(rawLevelData, damageType),
  ),

  canAttackAir: true,

  wikiUrl: "https://clashofclans.fandom.com/wiki/Dragon",
};

validateTroopEntityData(Dragon);
