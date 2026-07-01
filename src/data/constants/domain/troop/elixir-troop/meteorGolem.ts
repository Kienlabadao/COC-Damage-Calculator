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

const meteorGolemRawLevels: Record<number, TroopRawLevelData> = {
  1: {
    level: 1,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 13000,

    damageData: [
      {
        damagePerHit: 450,
      },
    ],
  },
  2: {
    level: 2,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 14500,

    damageData: [
      {
        damagePerHit: 500,
      },
    ],
  },
  3: {
    level: 3,
    isMaxLevel: true,
    townHallLevel: 18,

    hp: 16000,

    damageData: [
      {
        damagePerHit: 550,
      },
    ],
  },
};

const targetType = [TARGET_TYPE.Ground, TARGET_TYPE.Troop];
const damageType = normalizeOffenseDamageTypes([DAMAGE_TYPE.Direct]);

export const MeteorGolem: TroopData = {
  id: TROOP_ID.ElixirTroop.MeteorGolem,
  targetType: targetType,

  damageType: damageType,
  attackSpeedBetweenHit: 1,

  ...normalizeLevelData(meteorGolemRawLevels, (rawLevelData) =>
    normalizeTroopLevelData(rawLevelData, damageType),
  ),

  canAttackAir: true,

  wikiUrl: "https://clashofclans.fandom.com/wiki/Meteor_Golem",
};

validateTroopEntityData(MeteorGolem);
