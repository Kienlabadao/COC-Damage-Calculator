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

const iceGolemRawLevels: Record<number, TroopRawLevelData> = {
  1: {
    level: 1,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 2600,

    damageData: [
      {
        damagePerHit: 48,
      },
    ],
  },
  2: {
    level: 2,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 2800,

    damageData: [
      {
        damagePerHit: 56,
      },
    ],
  },
  3: {
    level: 3,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 3000,

    damageData: [
      {
        damagePerHit: 64,
      },
    ],
  },
  4: {
    level: 4,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 3200,

    damageData: [
      {
        damagePerHit: 72,
      },
    ],
  },
  5: {
    level: 5,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 3400,

    damageData: [
      {
        damagePerHit: 80,
      },
    ],
  },
  6: {
    level: 6,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 3600,

    damageData: [
      {
        damagePerHit: 88,
      },
    ],
  },
  7: {
    level: 7,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 3900,

    damageData: [
      {
        damagePerHit: 96,
      },
    ],
  },
  8: {
    level: 8,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 4200,

    damageData: [
      {
        damagePerHit: 104,
      },
    ],
  },
  9: {
    level: 9,
    isMaxLevel: true,
    townHallLevel: 17,

    hp: 4350,

    damageData: [
      {
        damagePerHit: 112,
      },
    ],
  },
};

const targetType = [TARGET_TYPE.Ground, TARGET_TYPE.Troop];
const damageType = normalizeOffenseDamageTypes([DAMAGE_TYPE.Direct]);

export const IceGolem: TroopData = {
  id: TROOP_ID.DarkElixirTroop.IceGolem,
  targetType: targetType,

  damageType: damageType,
  attackSpeedBetweenHit: 2,

  ...normalizeLevelData(iceGolemRawLevels, (rawLevelData) =>
    normalizeTroopLevelData(rawLevelData, damageType),
  ),

  canAttackAir: false,

  wikiUrl: "https://clashofclans.fandom.com/wiki/Ice_Golem",
};

validateTroopEntityData(IceGolem);
