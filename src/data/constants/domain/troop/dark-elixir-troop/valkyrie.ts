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

const valkyrieRawLevels: Record<number, TroopRawLevelData> = {
  1: {
    level: 1,
    isMaxLevel: false,
    townHallLevel: 8,

    hp: 750,

    damageData: [
      {
        damagePerHit: 169.2,
      },
    ],
  },
  2: {
    level: 2,
    isMaxLevel: false,
    townHallLevel: 8,

    hp: 850,

    damageData: [
      {
        damagePerHit: 190.8,
      },
    ],
  },
  3: {
    level: 3,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 950,

    damageData: [
      {
        damagePerHit: 214.2,
      },
    ],
  },
  4: {
    level: 4,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 1050,

    damageData: [
      {
        damagePerHit: 239.4,
      },
    ],
  },
  5: {
    level: 5,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 1300,

    damageData: [
      {
        damagePerHit: 266.4,
      },
    ],
  },
  6: {
    level: 6,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 1500,

    damageData: [
      {
        damagePerHit: 300.6,
      },
    ],
  },
  7: {
    level: 7,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 1650,

    damageData: [
      {
        damagePerHit: 333,
      },
    ],
  },
  8: {
    level: 8,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 1800,

    damageData: [
      {
        damagePerHit: 352.8,
      },
    ],
  },
  9: {
    level: 9,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 2000,

    damageData: [
      {
        damagePerHit: 374.4,
      },
    ],
  },
  10: {
    level: 10,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 2400,

    damageData: [
      {
        damagePerHit: 401.4,
      },
    ],
  },
  11: {
    level: 11,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 2600,

    damageData: [
      {
        damagePerHit: 428.4,
      },
    ],
  },
  12: {
    level: 12,
    isMaxLevel: true,
    townHallLevel: 17,

    hp: 2900,

    damageData: [
      {
        damagePerHit: 459,
      },
    ],
  },
};

const targetType = [TARGET_TYPE.Ground, TARGET_TYPE.Troop];
const damageType = normalizeOffenseDamageTypes([DAMAGE_TYPE.Direct]);

export const Valkyrie: TroopData = {
  id: TROOP_ID.DarkElixirTroop.Valkyrie,
  targetType: targetType,

  damageType: damageType,
  attackSpeedBetweenHit: 1.8,

  ...normalizeLevelData(valkyrieRawLevels, (rawLevelData) =>
    normalizeTroopLevelData(rawLevelData, damageType),
  ),

  canAttackAir: false,

  wikiUrl: "https://clashofclans.fandom.com/wiki/Valkyrie",
};

validateTroopEntityData(Valkyrie);
