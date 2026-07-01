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

const lavaHoundRawLevels: Record<number, TroopRawLevelData> = {
  1: {
    level: 1,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 6100,

    damageData: [
      {
        damagePerHit: 20,
        deathDamage: 100,
      },
    ],
  },
  2: {
    level: 2,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 6500,

    damageData: [
      {
        damagePerHit: 24,
        deathDamage: 150,
      },
    ],
  },
  3: {
    level: 3,
    isMaxLevel: false,
    townHallLevel: 10,

    hp: 6800,

    damageData: [
      {
        damagePerHit: 28,
        deathDamage: 200,
      },
    ],
  },
  4: {
    level: 4,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 7200,

    damageData: [
      {
        damagePerHit: 32,
        deathDamage: 250,
      },
    ],
  },
  5: {
    level: 5,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 7600,

    damageData: [
      {
        damagePerHit: 36,
        deathDamage: 300,
      },
    ],
  },
  6: {
    level: 6,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 8000,

    damageData: [
      {
        damagePerHit: 40,
        deathDamage: 350,
      },
    ],
  },
  7: {
    level: 7,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 8500,

    damageData: [
      {
        damagePerHit: 44,
        deathDamage: 400,
      },
    ],
  },
  8: {
    level: 8,
    isMaxLevel: true,
    townHallLevel: 18,

    hp: 9500,

    damageData: [
      {
        damagePerHit: 48,
        deathDamage: 450,
      },
    ],
  },
};

const targetType = [TARGET_TYPE.Air, TARGET_TYPE.Troop];
const damageType = normalizeOffenseDamageTypes([
  DAMAGE_TYPE.Direct,
  DAMAGE_TYPE.Death,
]);

export const LavaHound: TroopData = {
  id: TROOP_ID.DarkElixirTroop.LavaHound,
  troopType: [TROOP_TYPE.DarkElixir],

  targetType: targetType,

  damageType: damageType,
  attackSpeedBetweenHit: 2,

  ...normalizeLevelData(lavaHoundRawLevels, (rawLevelData) =>
    normalizeTroopLevelData(rawLevelData, damageType),
  ),

  canAttackAir: false,

  wikiUrl: "https://clashofclans.fandom.com/wiki/Lava_Hound",
};

validateTroopEntityData(LavaHound);
