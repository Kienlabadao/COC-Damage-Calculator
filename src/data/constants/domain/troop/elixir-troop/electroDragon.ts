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

const electroDragonRawLevels: Record<number, TroopRawLevelData> = {
  1: {
    level: 1,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 3400,

    damageData: [
      {
        damagePerHit: 910,
        deathDamage: 65,
      },
    ],
  },
  2: {
    level: 2,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 3900,

    damageData: [
      {
        damagePerHit: 1015,
        deathDamage: 75,
      },
    ],
  },
  3: {
    level: 3,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 4400,

    damageData: [
      {
        damagePerHit: 1120,
        deathDamage: 85,
      },
    ],
  },
  4: {
    level: 4,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 4700,

    damageData: [
      {
        damagePerHit: 1225,
        deathDamage: 95,
      },
    ],
  },
  5: {
    level: 5,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 5000,

    damageData: [
      {
        damagePerHit: 1330,
        deathDamage: 105,
      },
    ],
  },
  6: {
    level: 6,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 5400,

    damageData: [
      {
        damagePerHit: 1435,
        deathDamage: 115,
      },
    ],
  },
  7: {
    level: 7,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 5700,

    damageData: [
      {
        damagePerHit: 1540,
        deathDamage: 125,
      },
    ],
  },
  8: {
    level: 8,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 6200,

    damageData: [
      {
        damagePerHit: 1610,
        deathDamage: 135,
      },
    ],
  },
  9: {
    level: 9,
    isMaxLevel: true,
    townHallLevel: 18,

    hp: 6700,

    damageData: [
      {
        damagePerHit: 1750,
        deathDamage: 145,
      },
    ],
  },
};

const targetType = [TARGET_TYPE.Air, TARGET_TYPE.Troop];
const damageType = normalizeOffenseDamageTypes([
  DAMAGE_TYPE.Direct,
  DAMAGE_TYPE.Death,
  DAMAGE_TYPE.Chain,
]);

export const ElectroDragon: TroopData = {
  id: TROOP_ID.ElixirTroop.ElectroDragon,
  targetType: targetType,

  damageType: damageType,
  attackSpeedBetweenHit: 3.5,

  ...normalizeLevelData(electroDragonRawLevels, (rawLevelData) =>
    normalizeTroopLevelData(rawLevelData, damageType),
  ),

  canAttackAir: true,

  maxChainTargets: 4,
  chainDamageReductionInPercentage: 20,

  maxDeathDamageHitCount: 6,

  wikiUrl: "https://clashofclans.fandom.com/wiki/Electro_Dragon",
};

validateTroopEntityData(ElectroDragon);
