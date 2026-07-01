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

const witchRawLevels: Record<number, TroopRawLevelData> = {
  1: {
    level: 1,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 300,

    damageData: [
      {
        damagePerHit: 70,
      },
    ],
  },
  2: {
    level: 2,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 320,

    damageData: [
      {
        damagePerHit: 77,
      },
    ],
  },
  3: {
    level: 3,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 400,

    damageData: [
      {
        damagePerHit: 98,
      },
    ],
  },
  4: {
    level: 4,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 470,

    damageData: [
      {
        damagePerHit: 115.5,
      },
    ],
  },
  5: {
    level: 5,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 520,

    damageData: [
      {
        damagePerHit: 129.5,
      },
    ],
  },
  6: {
    level: 6,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 540,

    damageData: [
      {
        damagePerHit: 140,
      },
    ],
  },
  7: {
    level: 7,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 560,

    damageData: [
      {
        damagePerHit: 154,
      },
    ],
  },
  8: {
    level: 8,
    isMaxLevel: true,
    townHallLevel: 18,

    hp: 650,

    damageData: [
      {
        damagePerHit: 182,
      },
    ],
  },
};

const targetType = [TARGET_TYPE.Ground, TARGET_TYPE.Troop];
const damageType = normalizeOffenseDamageTypes([DAMAGE_TYPE.Direct]);

export const Witch: TroopData = {
  id: TROOP_ID.DarkElixirTroop.Witch,
  targetType: targetType,

  damageType: damageType,
  attackSpeedBetweenHit: 0.7,

  ...normalizeLevelData(witchRawLevels, (rawLevelData) =>
    normalizeTroopLevelData(rawLevelData, damageType),
  ),

  canAttackAir: true,

  wikiUrl: "https://clashofclans.fandom.com/wiki/Witch",
};

validateTroopEntityData(Witch);
