import { BaseModifierItem } from "objects/baseModifierItem";
import { equipmentDataUtils } from "utils/GameData/equipmentDataUtils";
import { BaseOffenseItem } from "objects/baseOffenseItem";
import { GAME_DATA_TYPE } from "data/game";
import { ACTION_TYPE } from "objects/actionItem";
import { calculateModifiedActionValue } from "actions/BaseModifierItem";
import {
  calculateDPSAfterAttackSpeedModified,
  calculateHeroHardModeDamage,
} from "utils/GameData/gameDataCalculatorUtils";

const type = GAME_DATA_TYPE.Equipment;

export function calculateEquipmentDPS(
  equipmentItem: BaseOffenseItem,
  activeModifier?: BaseModifierItem,
  attackSpeedModify?: number,
  useHardMode = false
): number | undefined {
  if (equipmentItem.type !== type) {
    throw new Error(
      `calculateEquipmentDPS ERROR: equipmentItem is not equipment type. equipmentItem: ${equipmentItem}`
    );
  }

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
    dpsBoost = calculateModifiedActionValue(
      dpsBoost,
      ACTION_TYPE.Equipment,
      activeModifier
    );
  }

  if (attackSpeedModify) {
    dpsBoost = calculateDPSAfterAttackSpeedModified(
      dpsBoost,
      attackSpeedModify
    );
  }

  if (useHardMode) {
    dpsBoost = calculateHeroHardModeDamage(dpsBoost);
  }

  return dpsBoost;
}
