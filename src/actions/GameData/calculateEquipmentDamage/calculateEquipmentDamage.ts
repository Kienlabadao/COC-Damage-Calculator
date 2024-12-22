import { ACTION_TYPE, ActionItem } from "objects/actionItem";
import {
  createDamageLogItem,
  DAMAGE_LOG_TYPE,
  DamageLogItem,
  DamageLogType,
} from "objects/damageLogItem";
import {
  calculateDirectDamage,
  calculateEarthquakeDamage,
} from "utils/GameData/gameDataCalculatorUtils";
import { equipmentDataUtils } from "utils/GameData/equipmentDataUtils";

export function calculateEquipmentDamage(
  action: ActionItem,
  currentHP: number,
  maxHP: number,
  earthquakeCount: number,
  isImmune: (offenseID: string) => boolean
): DamageLogItem {
  const equipmentID = action.actionID;
  const {
    getEquipmentDamage,
    isEquipmentDamageTypeDirect,
    isEquipmentDamageTypeEarthquake,
    isEquipmentTypeDamage,
    isEquipmentTypeAttack,
    isEquipmentTypeSupport,
  } = equipmentDataUtils(action.actionID);
  const type = ACTION_TYPE.Equipment;
  const equipmentCurrentLevelPos = action.currentLevelPos;
  let damage = 0;
  let damageLogType: DamageLogType = DAMAGE_LOG_TYPE.Immune;
  let earthquakeReducedDamage: number | undefined;

  if (!isImmune(equipmentID)) {
    if (isEquipmentTypeDamage()) {
      damage = getEquipmentDamage(equipmentCurrentLevelPos);

      if (isEquipmentDamageTypeDirect()) {
        currentHP = calculateDirectDamage(currentHP, damage);
        damageLogType = DAMAGE_LOG_TYPE.Attack;
      } else if (isEquipmentDamageTypeEarthquake()) {
        currentHP = calculateEarthquakeDamage(
          currentHP,
          maxHP,
          damage,
          earthquakeCount
        );

        if (earthquakeCount > 0) {
          earthquakeReducedDamage =
            currentHP - calculateEarthquakeDamage(currentHP, maxHP, damage, 0);
        }

        earthquakeCount++;
        damageLogType = DAMAGE_LOG_TYPE.Earthquake;
      } else {
        throw new Error(
          `gameDataCalculatorUtils.calculateEquipmentDamage ERROR: DamageType is not supported.`
        );
      }
    } else if (isEquipmentTypeAttack()) {
    } else if (isEquipmentTypeSupport()) {
      throw new Error(
        `gameDataCalculatorUtils.calculateEquipmentDamage ERROR: Equipment type Support can't deal damage.`
      );
    } else {
      throw new Error(
        `gameDataCalculatorUtils.calculateEquipmentDamage ERROR: Equipment type is not supported.`
      );
    }
  }

  return createDamageLogItem(
    equipmentID,
    type,
    equipmentCurrentLevelPos,
    damage,
    damageLogType,
    currentHP,
    earthquakeCount,
    undefined,
    undefined,
    undefined,
    earthquakeReducedDamage
  );
}
