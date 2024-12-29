export interface DefenseCountLog {
  maxDefenseCount: number;
  remainingDefense: number;
  hiddenSettingDefenseCount: number;
  hiddenSearchQueryDefenseCount: number;
  hiddenImpossibleDestroyDefenseCount: number;
  hiddenEquipmentDestroyedDefenseCount: number;
  hiddenNormalDefenseCount: number;
}

export function createDefenseCountLog(
  maxDefenseCount: number,
  remainingDefense = 0,
  hiddenSettingDefenseCount = 0,
  hiddenSearchQueryDefenseCount = 0,
  hiddenImpossibleDestroyDefenseCount = 0,
  hiddenEquipmentDestroyedDefenseCount = 0,
  hiddenNormalDefenseCount = 0
): DefenseCountLog {
  return {
    maxDefenseCount,
    remainingDefense,
    hiddenSettingDefenseCount,
    hiddenSearchQueryDefenseCount,
    hiddenImpossibleDestroyDefenseCount,
    hiddenEquipmentDestroyedDefenseCount,
    hiddenNormalDefenseCount,
  };
}
