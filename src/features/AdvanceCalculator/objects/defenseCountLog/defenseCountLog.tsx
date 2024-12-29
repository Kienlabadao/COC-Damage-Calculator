export interface DefenseCountLog {
  maxDefenseCount: number;
  remainingDefense: number;
  hiddenSettingDefenseCount: number;
  hiddenSearchQueryDefenseCount: number;
  hiddenSurvivedDefenseCount: number;
  hiddenDestroyedDefenseCount: number;
}

export function createDefenseCountLog(
  maxDefenseCount: number,
  remainingDefense = 0,
  hiddenSettingDefenseCount = 0,
  hiddenSearchQueryDefenseCount = 0,
  hiddenSurvivedDefenseCount = 0,
  hiddenDestroyedDefenseCount = 0
): DefenseCountLog {
  return {
    maxDefenseCount,
    remainingDefense,
    hiddenSettingDefenseCount,
    hiddenSearchQueryDefenseCount,
    hiddenSurvivedDefenseCount,
    hiddenDestroyedDefenseCount,
  };
}
