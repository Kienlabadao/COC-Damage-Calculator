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
    townHallLevel: 16,

    hp: 2300,
  },
  2: {
    level: 2,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 2550,
  },
  3: {
    level: 3,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 2800,
  },
  4: {
    level: 4,
    isMaxLevel: true,
    townHallLevel: 18,

    hp: 3050,
  },
};

const targetType = [TARGET_TYPE.Ground, TARGET_TYPE.Troop];

export const RuinWitch: TargetOnlyTroopData = {
  id: TROOP_ID.DarkElixirTroop.RuinWitch,
  troopType: [TROOP_TYPE.DarkElixir],

  targetType: targetType,

  ...normalizeLevelData(healerRawLevels, (rawLevelData) =>
    normalizeTargetOnlyTroopLevelData(rawLevelData),
  ),

  wikiUrl: "https://clashofclans.fandom.com/wiki/Ruin_Witch",
};

validateTargetOnlyTroopEntityData(RuinWitch);
