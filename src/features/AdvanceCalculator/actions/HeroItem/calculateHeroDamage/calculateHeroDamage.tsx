import { EquipmentDamageLog } from "features/AdvanceCalculator/objects/equipmentDamageLog";
import { EquipmentItem } from "features/AdvanceCalculator/objects/equipmentItem";
import { HeroItem } from "features/AdvanceCalculator/objects/heroItem";
import { ModifierItem } from "features/AdvanceCalculator/objects/modifierItem";
import { calculateDPH } from "utils/GameData/gameDataCalculatorUtils";
import { equipmentDataUtils } from "utils/GameData/equipmentDataUtils";
import { roundToN } from "utils/numberUtils";
import { ROUNDING_PRECISION } from "config";
import { calculateHeroDPS } from "actions/BaseOffenseItem";

export function calculateHeroDamage(
  heroItem: HeroItem,
  equipmentItemList: EquipmentItem[],
  equipmentDamageLogList: Record<string, EquipmentDamageLog>,
  attackSpeed: number,
  attackSpeedModify: number,
  useHardMode: boolean,
  activeModifier?: ModifierItem
): {
  dps: number;
  dph: number;
  activeAttackEquipmentItem: EquipmentItem | undefined;
} {
  let dps = calculateHeroDPS(
    heroItem,
    activeModifier,
    attackSpeedModify,
    useHardMode
  );
  const useAbility = heroItem.useAbility;
  let activeAttackEquipmentItem: EquipmentItem | undefined = undefined;

  for (const equipmentItem of equipmentItemList) {
    if (equipmentItem.use) {
      const equipmentID = equipmentItem.offenseID;
      const { isEquipmentTypeAttack } = equipmentDataUtils(equipmentID);

      dps += equipmentDamageLogList[equipmentID].dps ?? 0;

      if (useAbility && isEquipmentTypeAttack()) {
        if (activeAttackEquipmentItem) {
          throw new Error(
            `calculateHeroDamage ERROR: Only 1 active attack equipment is supported.`
          );
        }
        activeAttackEquipmentItem = equipmentItem;
      }
    }
  }
  dps = roundToN(dps, ROUNDING_PRECISION);

  let dph = calculateDPH(dps, attackSpeed);
  if (activeAttackEquipmentItem) {
    const equipmentID = activeAttackEquipmentItem.offenseID;

    dph = roundToN(
      dph + equipmentDamageLogList[equipmentID].extraDamage!,
      ROUNDING_PRECISION
    );
  }

  return {
    dps,
    dph,
    activeAttackEquipmentItem,
  };
}
