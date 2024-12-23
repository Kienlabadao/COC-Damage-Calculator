import { BaseModifierItem, getModifiedValue } from "objects/baseModifierItem";
import { equipmentDataUtils } from "utils/GameData/equipmentDataUtils";
import { BaseOffenseItem } from "objects/baseOffenseItem";
import { GAME_DATA_TYPE } from "data/game";

const type = GAME_DATA_TYPE.Equipment;

export function calculateEquipmentModifiedDPSBoost(
  equipmentItem: BaseOffenseItem,
  activeModifier: BaseModifierItem
): number | undefined {
  if (equipmentItem.type !== type) {
    throw new Error(
      `calculateEquipmentModifiedDPSBoost ERROR: equipmentItem is not equipment type. equipmentItem: ${equipmentItem}`
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

  return getModifiedValue(dpsBoost, activeModifier);
}
