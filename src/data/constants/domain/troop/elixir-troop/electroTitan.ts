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

const electroTitanRawLevels: Record<number, TroopRawLevelData> = {
  1: {
    level: 1,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 7200,

    damageData: [
      {
        damagePerHit: 270,
        auraDamagePerHit: 30,
      },
    ],
  },
  2: {
    level: 2,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 7700,

    damageData: [
      {
        damagePerHit: 300,
        auraDamagePerHit: 40,
      },
    ],
  },
  3: {
    level: 3,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 8200,

    damageData: [
      {
        damagePerHit: 330,
        auraDamagePerHit: 50,
      },
    ],
  },
  4: {
    level: 4,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 8700,

    damageData: [
      {
        damagePerHit: 360,
        auraDamagePerHit: 55,
      },
    ],
  },
  5: {
    level: 5,
    isMaxLevel: true,
    townHallLevel: 18,

    hp: 9200,

    damageData: [
      {
        damagePerHit: 405,
        auraDamagePerHit: 60,
      },
    ],
  },
};

const targetType = [TARGET_TYPE.Ground, TARGET_TYPE.Troop];
const damageType = normalizeOffenseDamageTypes([
  DAMAGE_TYPE.Direct,
  DAMAGE_TYPE.Aura,
]);

export const ElectroTitan: TroopData = {
  id: TROOP_ID.ElixirTroop.ElectroTitan,
  targetType: targetType,

  damageType: damageType,
  attackSpeedBetweenHit: 1.5,
  auraDamageAttackSpeed: 0.4,

  ...normalizeLevelData(electroTitanRawLevels, (rawLevelData) =>
    normalizeTroopLevelData(rawLevelData, damageType),
  ),

  canAttackAir: true,

  wikiUrl: "https://clashofclans.fandom.com/wiki/Electro_Titan",
};

validateTroopEntityData(ElectroTitan);
