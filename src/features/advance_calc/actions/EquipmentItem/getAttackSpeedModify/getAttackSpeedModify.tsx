import { EquipmentItem } from "features/advance_calc/objects/equipmentItem";
import { equipmentDataUtils } from "utils/GameData/equipmentDataUtils";

export function getAttackSpeedModify(
  equipmentItemList: EquipmentItem[],
  useAbility: boolean
): number {
  let attackSpeedModify = 0;

  equipmentItemList.forEach((equipmentItem) => {
    if (equipmentItem.use) {
      const currentLevelPos = equipmentItem.currentLevelPos;
      const {
        canGiveAttackSpeedBoost,
        canGiveAbilityAttackSpeedBoost,
        getEquipmentAttackSpeedBoost,
        getEquipmentAbilityAttackSpeedBoost,
      } = equipmentDataUtils(equipmentItem.offenseID);

      if (canGiveAttackSpeedBoost()) {
        attackSpeedModify += getEquipmentAttackSpeedBoost(currentLevelPos);
      }
      if (useAbility && canGiveAbilityAttackSpeedBoost()) {
        attackSpeedModify +=
          getEquipmentAbilityAttackSpeedBoost(currentLevelPos);
      }
    }
  });

  return attackSpeedModify;
}
