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
    townHallLevel: 15,

    hp: 1530,
  },
  2: {
    level: 2,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 1620,
  },
  3: {
    level: 3,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 1710,
  },
  4: {
    level: 4,
    isMaxLevel: true,
    townHallLevel: 17,

    hp: 1800,
  },
};

const targetType = [TARGET_TYPE.Ground, TARGET_TYPE.Troop];

export const Furnace: TargetOnlyTroopData = {
  id: TROOP_ID.DarkElixirTroop.Furnace,
  troopType: [TROOP_TYPE.DarkElixir],

  targetType: targetType,

  ...normalizeLevelData(healerRawLevels, (rawLevelData) =>
    normalizeTargetOnlyTroopLevelData(rawLevelData),
  ),

  wikiUrl: "https://clashofclans.fandom.com/wiki/Furnace",
};

validateTargetOnlyTroopEntityData(Furnace);
