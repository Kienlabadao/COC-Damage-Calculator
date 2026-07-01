import { normalizeLevelData } from "../../shared/baseData.util";
import { TARGET_TYPE } from "../../shared/target/targetType";
import { normalizeTargetOnlyTroopLevelData } from "../shared/target-only-troop-data/targetOnlyTroopData.util";
import { TROOP_ID } from "../../shared/id/troopId";
import {
  type TargetOnlyTroopData,
  type TargetOnlyTroopRawLevelData,
} from "../shared/target-only-troop-data/targetOnlyTroopData";
import { validateTargetOnlyTroopEntityData } from "../shared/target-only-troop-data/targetOnlyTroopData.util";
import { TROOP_TYPE } from "../shared/troopType";

const healerRawLevels: Record<number, TargetOnlyTroopRawLevelData> = {
  1: {
    level: 1,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 1300,
  },
  2: {
    level: 2,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 1400,
  },
  3: {
    level: 3,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 1500,
  },
  4: {
    level: 4,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 1600,
  },
  5: {
    level: 5,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 1700,
  },
  6: {
    level: 6,
    isMaxLevel: true,
    townHallLevel: 18,

    hp: 1850,
  },
};

const targetType = [TARGET_TYPE.Ground, TARGET_TYPE.Troop];

export const Druid: TargetOnlyTroopData = {
  id: TROOP_ID.DarkElixirTroop.Druid,
  troopType: [TROOP_TYPE.DarkElixir],

  targetType: targetType,

  ...normalizeLevelData(healerRawLevels, (rawLevelData) =>
    normalizeTargetOnlyTroopLevelData(rawLevelData),
  ),

  wikiUrl: "https://clashofclans.fandom.com/wiki/Druid",
};

validateTargetOnlyTroopEntityData(Druid);
