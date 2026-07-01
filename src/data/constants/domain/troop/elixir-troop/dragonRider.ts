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

const dragonRiderRawLevels: Record<number, TroopRawLevelData> = {
  1: {
    level: 1,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 4100,

    damageData: [
      {
        damagePerHit: 408,
        deathDamage: 700,
      },
    ],
  },
  2: {
    level: 2,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 4400,

    damageData: [
      {
        damagePerHit: 444,
        deathDamage: 800,
      },
    ],
  },
  3: {
    level: 3,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 4700,

    damageData: [
      {
        damagePerHit: 480,
        deathDamage: 900,
      },
    ],
  },
  4: {
    level: 4,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 5100,

    damageData: [
      {
        damagePerHit: 516,
        deathDamage: 1000,
      },
    ],
  },
  5: {
    level: 5,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 5600,

    damageData: [
      {
        damagePerHit: 564,
        deathDamage: 1100,
      },
    ],
  },
  6: {
    level: 6,
    isMaxLevel: true,
    townHallLevel: 18,

    hp: 6000,

    damageData: [
      {
        damagePerHit: 612,
        deathDamage: 1200,
      },
    ],
  },
};

const targetType = [TARGET_TYPE.Air, TARGET_TYPE.Troop];
const damageType = normalizeOffenseDamageTypes([
  DAMAGE_TYPE.Direct,
  DAMAGE_TYPE.Death,
]);

export const DragonRider: TroopData = {
  id: TROOP_ID.ElixirTroop.DragonRider,
  targetType: targetType,

  damageType: damageType,
  attackSpeedBetweenHit: 1.2,

  ...normalizeLevelData(dragonRiderRawLevels, (rawLevelData) =>
    normalizeTroopLevelData(rawLevelData, damageType),
  ),

  canAttackAir: true,

  wikiUrl: "https://clashofclans.fandom.com/wiki/Dragon_Rider",
};

validateTroopEntityData(DragonRider);
