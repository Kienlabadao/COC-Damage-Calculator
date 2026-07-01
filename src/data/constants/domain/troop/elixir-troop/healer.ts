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
    townHallLevel: 6,

    hp: 500,
  },
  2: {
    level: 2,
    isMaxLevel: false,
    townHallLevel: 7,

    hp: 700,
  },
  3: {
    level: 3,
    isMaxLevel: false,
    townHallLevel: 8,

    hp: 900,
  },
  4: {
    level: 4,
    isMaxLevel: false,
    townHallLevel: 9,

    hp: 1200,
  },
  5: {
    level: 5,
    isMaxLevel: false,
    townHallLevel: 11,

    hp: 1500,
  },
  6: {
    level: 6,
    isMaxLevel: false,
    townHallLevel: 13,

    hp: 1600,
  },
  7: {
    level: 7,
    isMaxLevel: false,
    townHallLevel: 14,

    hp: 1700,
  },
  8: {
    level: 8,
    isMaxLevel: false,
    townHallLevel: 15,

    hp: 1800,
  },
  9: {
    level: 9,
    isMaxLevel: false,
    townHallLevel: 16,

    hp: 1900,
  },
  10: {
    level: 10,
    isMaxLevel: false,
    townHallLevel: 17,

    hp: 2000,
  },
  11: {
    level: 11,
    isMaxLevel: true,
    townHallLevel: 18,

    hp: 2100,
  },
};

const targetType = [TARGET_TYPE.Air, TARGET_TYPE.Troop];

export const Healer: TargetOnlyTroopData = {
  id: TROOP_ID.ElixirTroop.Healer,
  troopType: [TROOP_TYPE.Elixir],

  targetType: targetType,

  ...normalizeLevelData(healerRawLevels, (rawLevelData) =>
    normalizeTargetOnlyTroopLevelData(rawLevelData),
  ),

  wikiUrl: "https://clashofclans.fandom.com/wiki/Healer",
};

validateTargetOnlyTroopEntityData(Healer);
