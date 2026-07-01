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

const throwerRawLevels: Record<number, TroopRawLevelData> = {
  1: {
    level: 1,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 2200,

    damageData: [
      {
        damagePerHit: 475,
      },
    ],
  },
  2: {
    level: 2,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 2350,

    damageData: [
      {
        damagePerHit: 525,
      },
    ],
  },
  3: {
    level: 3,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 2600,

    damageData: [
      {
        damagePerHit: 575,
      },
    ],
  },
  4: {
    level: 4,
    isMaxLevel: true,
    townHallLevel: 18,

    hp: 2800,

    damageData: [
      {
        damagePerHit: 600,
      },
    ],
  },
};

const targetType = [TARGET_TYPE.Ground, TARGET_TYPE.Troop];
const damageType = normalizeOffenseDamageTypes([DAMAGE_TYPE.Direct]);

export const Thrower: TroopData = {
  id: TROOP_ID.ElixirTroop.Thrower,
  targetType: targetType,

  damageType: damageType,
  attackSpeedBetweenHit: 2.5,

  ...normalizeLevelData(throwerRawLevels, (rawLevelData) =>
    normalizeTroopLevelData(rawLevelData, damageType),
  ),

  canAttackAir: true,

  wikiUrl: "https://clashofclans.fandom.com/wiki/Thrower",
};

validateTroopEntityData(Thrower);
