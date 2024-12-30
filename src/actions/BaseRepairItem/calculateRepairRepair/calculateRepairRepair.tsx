import { calculateModifiedActionValue } from "actions/BaseModifierItem";
import { ModifierItem } from "features/AdvanceCalculator/objects/modifierItem";
import { ACTION_TYPE } from "objects/actionItem";
import { BaseRepairItem } from "objects/baseRepairItem";
import { repairDataUtils } from "utils/GameData/repairDataUtils";

export function calculateRepairRepair(
  repairItem: BaseRepairItem,
  activeModifier?: ModifierItem
): number {
  const { getRepairRepair } = repairDataUtils(repairItem.repairID);

  let repair = getRepairRepair(repairItem.currentLevelPos);

  if (activeModifier) {
    repair = calculateModifiedActionValue(
      repair,
      ACTION_TYPE.Repair,
      activeModifier
    );
  }

  return repair;
}
