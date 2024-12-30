import { EquipmentItem } from "features/AdvanceCalculator/objects/equipmentItem";
import { equipmentDataUtils } from "utils/GameData/equipmentDataUtils";
import { calculateCombinedPercentageIncrease } from "utils/numberUtils";

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
        attackSpeedModify = calculateCombinedPercentageIncrease(
          attackSpeedModify,
          getEquipmentAttackSpeedBoost(currentLevelPos)
        );
      }
      if (useAbility && canGiveAbilityAttackSpeedBoost()) {
        attackSpeedModify = calculateCombinedPercentageIncrease(
          attackSpeedModify,
          getEquipmentAbilityAttackSpeedBoost(currentLevelPos)
        );
      }
    }
  });

  return attackSpeedModify;
}
