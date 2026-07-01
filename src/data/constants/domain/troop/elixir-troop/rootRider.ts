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

const rootRiderRawLevels: Record<number, TroopRawLevelData> = {
  1: {
    level: 1,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 6200,

    damageData: [
      {
        damagePerHit: 209,
      },
      {
        targetType: [TARGET_TYPE.Wall],

        damagePerHit: 4000,
      },
    ],
  },
  2: {
    level: 2,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 6350,

    damageData: [
      {
        damagePerHit: 231,
      },
      {
        targetType: [TARGET_TYPE.Wall],

        damagePerHit: 4000,
      },
    ],
  },
  3: {
    level: 3,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 6500,

    damageData: [
      {
        damagePerHit: 253,
      },
      {
        targetType: [TARGET_TYPE.Wall],

        damagePerHit: 4000,
      },
    ],
  },
  4: {
    level: 4,
    isMaxLevel: true,
    townHallLevel: 18,

    hp: 6700,

    damageData: [
      {
        damagePerHit: 275,
      },
      {
        targetType: [TARGET_TYPE.Wall],

        damagePerHit: 4000,
      },
    ],
  },
};

const targetType = [TARGET_TYPE.Ground, TARGET_TYPE.Troop];
const damageType = normalizeOffenseDamageTypes([DAMAGE_TYPE.Direct]);

export const RootRider: TroopData = {
  id: TROOP_ID.ElixirTroop.RootRider,
  troopType: [TROOP_TYPE.Elixir],

  targetType: targetType,

  damageType: damageType,
  attackSpeedBetweenHit: 2.2,
  separateAttackSpeed: [
    {
      targetType: [TARGET_TYPE.Wall],
      attackSpeedBetweenHit: 0.4,
    },
  ],

  ...normalizeLevelData(rootRiderRawLevels, (rawLevelData) =>
    normalizeTroopLevelData(rawLevelData, damageType),
  ),

  canAttackAir: false,

  wikiUrl: "https://clashofclans.fandom.com/wiki/Root_Rider",
};

validateTroopEntityData(RootRider);
