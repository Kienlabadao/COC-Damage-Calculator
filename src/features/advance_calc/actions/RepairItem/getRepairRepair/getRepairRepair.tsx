import { ModifierItem } from "features/advance_calc/objects/modifierItem";
import { RepairItem } from "features/advance_calc/objects/repairItem";
import { getModifiedValue } from "objects/baseModifierItem";
import { repairDataUtils } from "utils/GameData/repairDataUtils";

export function getRepairRepair(
  repairItem: RepairItem,
  activeModifier?: ModifierItem
): number {
  const { getRepairRepair } = repairDataUtils(repairItem.repairID);

  let repair = getRepairRepair(repairItem.currentLevelPos);
  if (activeModifier) {
    repair = getModifiedValue(repair, activeModifier);
  }

  return repair;
}
