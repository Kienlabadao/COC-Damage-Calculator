import {
  type TargetOnlyTroopData,
  type TargetOnlyTroopLevelData,
  type TargetOnlyTroopRawLevelData,
} from "./targetOnlyTroopData";

export function normalizeTargetOnlyTroopLevelData(
  rawLevelData: TargetOnlyTroopRawLevelData,
): TargetOnlyTroopLevelData {
  const { level, isMaxLevel, townHallLevel, hp } = rawLevelData;

  return {
    ...rawLevelData,
    level,
    isMaxLevel,
    townHallLevel,
    hp,
  };
}

export function validateTargetOnlyTroopEntityData(
  _troopData: TargetOnlyTroopData,
): void {}
