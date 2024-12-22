import { ModifierItem } from "features/advance_calc/objects/modifierItem";
import { RepairItem } from "features/advance_calc/objects/repairItem";
import { getActiveModifier } from "../getActiveModifier";
import { getModifiedValue } from "objects/baseModifierItem";
import { repairDataUtils } from "utils/GameData/repairDataUtils";
import { GAME_DATA_TYPE } from "data/game";

const type = GAME_DATA_TYPE.Repair;

export function calculateRepairModifiedValue(
  repairItem: RepairItem,
  modifierItemList: ModifierItem[]
): readonly [number, ModifierItem | null] {
  const repairID = repairItem.repairID;
  const activeModifier = getActiveModifier(repairID, type, modifierItemList);
  const { getRepairRepair } = repairDataUtils(repairID);

  let repair = getRepairRepair(repairItem.currentLevelPos);
  if (activeModifier) {
    repair = getModifiedValue(repair, activeModifier);
  }

  return [repair, activeModifier] as const;
}
