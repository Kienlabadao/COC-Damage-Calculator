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

const apprenticeWardenRawLevels: Record<number, TroopRawLevelData> = {
  1: {
    level: 1,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 1500,

    damageData: [
      {
        damagePerHit: 153,
      },
    ],
  },
  2: {
    level: 2,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 1650,

    damageData: [
      {
        damagePerHit: 166.5,
      },
    ],
  },
  3: {
    level: 3,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 1800,

    damageData: [
      {
        damagePerHit: 180,
      },
    ],
  },
  4: {
    level: 4,
    isMaxLevel: true,
    townHallLevel: 15,

    hp: 1950,

    damageData: [
      {
        damagePerHit: 193.5,
      },
    ],
  },
};

const targetType = [TARGET_TYPE.Ground, TARGET_TYPE.Troop];
const damageType = normalizeOffenseDamageTypes([DAMAGE_TYPE.Direct]);

export const ApprenticeWarden: TroopData = {
  id: TROOP_ID.DarkElixirTroop.ApprenticeWarden,
  troopType: [TROOP_TYPE.DarkElixir],

  targetType: targetType,

  damageType: damageType,
  attackSpeedBetweenHit: 0.9,

  ...normalizeLevelData(apprenticeWardenRawLevels, (rawLevelData) =>
    normalizeTroopLevelData(rawLevelData, damageType),
  ),

  canAttackAir: true,

  wikiUrl: "https://clashofclans.fandom.com/wiki/Apprentice_Warden",
};

validateTroopEntityData(ApprenticeWarden);
