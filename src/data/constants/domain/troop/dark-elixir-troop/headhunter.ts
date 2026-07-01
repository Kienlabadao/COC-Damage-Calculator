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
import { OFFENSE_MODIFIER_TYPE } from "../../shared/offense/offenseModifierType";
import { ADDITIONAL_DAMAGE_TYPE } from "../../shared/offense/additionalDamageType";

const headhunterRawLevels: Record<number, TroopRawLevelData> = {
  1: {
    level: 1,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 360,

    damageData: [
      {
        damagePerHit: 63,
      },
    ],
  },
  2: {
    level: 2,
    isMaxLevel: false,
    townHallLevel: 12,

    hp: 400,

    damageData: [
      {
        damagePerHit: 69,
      },
    ],
  },
  3: {
    level: 3,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 440,

    damageData: [
      {
        damagePerHit: 75,
      },
    ],
  },
  4: {
    level: 4,
    isMaxLevel: true,
    townHallLevel: 18,

    hp: 500,

    damageData: [
      {
        damagePerHit: 81,
      },
    ],
  },
};

const targetType = [TARGET_TYPE.Ground, TARGET_TYPE.Troop];
const damageType = normalizeOffenseDamageTypes([DAMAGE_TYPE.Direct]);

export const Headhunter: TroopData = {
  id: TROOP_ID.DarkElixirTroop.Headhunter,
  targetType: targetType,

  damageType: damageType,
  additionalDamageType: ADDITIONAL_DAMAGE_TYPE.Poison,
  attackSpeedBetweenHit: 0.6,

  ...normalizeLevelData(headhunterRawLevels, (rawLevelData) =>
    normalizeTroopLevelData(rawLevelData, damageType),
  ),

  modifiers: [
    {
      modifierType: OFFENSE_MODIFIER_TYPE.PreferenceTarget,
      preferenceTargetType: TARGET_TYPE.Hero,

      damagePerHitMultiplierInPercentage: 300,
    },
  ],

  canAttackAir: true,

  wikiUrl: "https://clashofclans.fandom.com/wiki/Headhunter",
};

validateTroopEntityData(Headhunter);
