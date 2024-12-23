import { ModifierItem } from "features/advance_calc/objects/modifierItem";
import { getModifiedValue } from "objects/baseModifierItem";
import { equipmentDataUtils } from "utils/GameData/equipmentDataUtils";
import { EquipmentItem } from "features/advance_calc/objects/equipmentItem";
import {
  calculateDPSAfterAttackSpeedModified,
  calculateHardModeHeroDPS,
} from "utils/GameData/gameDataCalculatorUtils";

export function getEquipmentDPS(
  equipmentItem: EquipmentItem,
  activeModifier?: ModifierItem,
  attackSpeedModify?: number,
  useHardMode = false
): number | undefined {
  const equipmentID = equipmentItem.offenseID;
  const currentLevelPos = equipmentItem.currentLevelPos;
  const { getEquipmentDPSBoost, canGiveDPSBoost } =
    equipmentDataUtils(equipmentID);

  let dpsBoost: number;
  if (canGiveDPSBoost()) {
    dpsBoost = getEquipmentDPSBoost(currentLevelPos);
  } else {
    return undefined;
  }

  if (activeModifier) {
    dpsBoost = getModifiedValue(dpsBoost, activeModifier);
  }

  if (attackSpeedModify) {
    dpsBoost = calculateDPSAfterAttackSpeedModified(
      dpsBoost,
      attackSpeedModify
    );
  }

  if (useHardMode) {
    dpsBoost = calculateHardModeHeroDPS(dpsBoost);
  }

  return dpsBoost;
}
