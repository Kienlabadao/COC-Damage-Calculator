import {
  createEquipmentDamageLog,
  EquipmentDamageLog,
} from "features/AdvanceCalculator/objects/equipmentDamageLog";
import { EquipmentItem } from "features/AdvanceCalculator/objects/equipmentItem";
import { ModifierItem } from "features/AdvanceCalculator/objects/modifierItem";
import {
  calculateDPH,
  calculateHeroHardModeDamage,
} from "utils/GameData/gameDataCalculatorUtils";
import { equipmentDataUtils } from "utils/GameData/equipmentDataUtils";
import { calculateEquipmentDPS } from "actions/BaseOffenseItem";

export function calculateEquipmentDamageLog(
  equipmentItem: EquipmentItem,
  attackSpeed: number,
  attackSpeedModify: number,
  useHardMode: boolean,
  activeModifier?: ModifierItem
): EquipmentDamageLog {
  const equipmentID = equipmentItem.offenseID;
  const currentLevelPos = equipmentItem.currentLevelPos;
  const { getEquipmentDamage, isEquipmentTypeAttack, isEquipmentTypeDamage } =
    equipmentDataUtils(equipmentID);

  const dpsBoost = calculateEquipmentDPS(
    equipmentItem,
    activeModifier,
    attackSpeedModify,
    useHardMode
  );

  const dphBoost = dpsBoost ? calculateDPH(dpsBoost, attackSpeed) : undefined;

  const damage = isEquipmentTypeDamage()
    ? getEquipmentDamage(currentLevelPos)
    : undefined;

  let extraDamage = isEquipmentTypeAttack()
    ? getEquipmentDamage(currentLevelPos)
    : undefined;
  if (extraDamage && useHardMode) {
    extraDamage = calculateHeroHardModeDamage(extraDamage);
  }

  return createEquipmentDamageLog(dpsBoost, dphBoost, damage, extraDamage);
}
