import { EquipmentItem } from "features/AdvanceCalculator/objects/equipmentItem";
import { getAttackSpeedModify } from "../getAttackSpeedModify";
import { calculateModifiedAttackSpeed } from "utils/GameData/gameDataCalculatorUtils";

export function calculateHeroAttackSpeed(
  baseAttackSpeed: number,
  equipmentItemList: EquipmentItem[],
  useAbility: boolean
) {
  const attackSpeedModify = getAttackSpeedModify(equipmentItemList, useAbility);
  const attackSpeed = calculateModifiedAttackSpeed(
    baseAttackSpeed,
    attackSpeedModify
  );

  return { attackSpeed, attackSpeedModify };
}
