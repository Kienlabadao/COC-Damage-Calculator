import {
  createEquipmentDamageLog,
  EquipmentDamageLog,
} from "features/advance_calc/objects/equipmentDamageLog";
import { EquipmentItem } from "features/advance_calc/objects/equipmentItem";
import { ModifierItem } from "features/advance_calc/objects/modifierItem";
import { getEquipmentDPS } from "../../EquipmentItem";
import { calculateDPH } from "utils/GameData/gameDataCalculatorUtils";
import { equipmentDataUtils } from "utils/GameData/equipmentDataUtils";

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

  const dpsBoost = getEquipmentDPS(
    equipmentItem,
    activeModifier,
    attackSpeedModify,
    useHardMode
  );
  const dphBoost = dpsBoost ? calculateDPH(dpsBoost, attackSpeed) : undefined;
  const damage = isEquipmentTypeDamage()
    ? getEquipmentDamage(currentLevelPos)
    : undefined;
  const extraDamage = isEquipmentTypeAttack()
    ? getEquipmentDamage(currentLevelPos)
    : undefined;

  return createEquipmentDamageLog(dpsBoost, dphBoost, damage, extraDamage);
}
