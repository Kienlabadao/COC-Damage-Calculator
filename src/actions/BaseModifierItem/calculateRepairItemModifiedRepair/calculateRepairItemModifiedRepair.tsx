import { BaseModifierItem, getModifiedValue } from "objects/baseModifierItem";
import { repairDataUtils } from "utils/GameData/repairDataUtils";
import { BaseRepairItem } from "objects/baseRepairItem";

export function calculateRepairItemModifiedRepair(
  repairItem: BaseRepairItem,
  activeModifier: BaseModifierItem
): number {
  const repairID = repairItem.repairID;
  const { getRepairRepair } = repairDataUtils(repairID);
  const repair = getRepairRepair(repairItem.currentLevelPos);

  return getModifiedValue(repair, activeModifier);
}
