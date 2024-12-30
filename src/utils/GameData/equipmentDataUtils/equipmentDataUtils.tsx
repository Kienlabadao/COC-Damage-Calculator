import {
  DAMAGE_TYPE,
  DamageType,
  EQUIPMENT_TYPE,
  EquipmentData,
  EquipmentType,
  HARD_MODE_LEVEL_CAP,
  Hero,
  RARITY,
  Rarity,
} from "data/Game";
import { OFFENSE_IMG_PATH } from "data/constants";

export function equipmentDataUtils(equipmentID: string) {
  const equipmentData = EquipmentData[equipmentID];
  if (equipmentData === undefined) {
    throw new Error(
      `equipmentDataUtils ERROR: Equipment with ID "${equipmentID}" not found.`
    );
  }

  function getEquipmentName(): string {
    return equipmentData.name;
  }

  function getEquipmentImage(): string {
    return `${OFFENSE_IMG_PATH}/equipments/${equipmentID}.webp`;
  }

  function getEquipmentUser(): Hero {
    return equipmentData.user;
  }

  function getEquipmentRarity(): Rarity {
    return equipmentData.rarity;
  }

  function getEquipmentType(): EquipmentType[] {
    return equipmentData.equipment_type;
  }

  function getEquipmentDamageType(): DamageType | null {
    return equipmentData.damage_type;
  }

  function getEquipmentLevelCount(): number {
    return canDealDamage()
      ? equipmentData.damage.length
      : equipmentData.dps_boost.length;
  }

  function getEquipmentMaxLevelPos(useHardMode = false): number {
    if (useHardMode) {
      if (isEquipmentRarityCommon()) {
        return HARD_MODE_LEVEL_CAP.Common - 1;
      } else if (isEquipmentRarityEpic()) {
        return HARD_MODE_LEVEL_CAP.Epic - 1;
      } else {
        throw new Error(
          `equipmentDataUtils.getEquipmentMaxLevelPos ERROR: Rarity (${getEquipmentRarity()}) is not supported.`
        );
      }
    } else {
      return getEquipmentLevelCount() - 1;
    }
  }

  function getEquipmentMinLevelPos(): number {
    return 0;
  }

  function getEquipmentLevel(levelPos: number): number {
    if (isValidEquipmentLevelPos(levelPos)) {
      return canDealDamage()
        ? equipmentData.damage[levelPos].level
        : equipmentData.dps_boost[levelPos].level;
    } else {
      throw new Error(
        `equipmentDataUtils.getEquipmentLevel ERROR: Invalid level pos. EquipmentID: ${equipmentID}. LevelPos: ${levelPos}`
      );
    }
  }

  function getEquipmentDamage(levelPos: number): number {
    if (isValidEquipmentLevelPos(levelPos)) {
      if (canDealDamage()) {
        return equipmentData.damage[levelPos].damage;
      } else {
        throw new Error(
          `equipmentDataUtils.getEquipmentDamage ERROR: Equipment can't deal damage. EquipmentID: ${equipmentID}.`
        );
      }
    } else {
      throw new Error(
        `equipmentDataUtils.getEquipmentDamage ERROR: Invalid level pos. EquipmentID: ${equipmentID}. LevelPos: ${levelPos}`
      );
    }
  }

  function getEquipmentDPSBoost(levelPos: number): number {
    if (isValidEquipmentLevelPos(levelPos)) {
      if (canGiveDPSBoost()) {
        return equipmentData.dps_boost[levelPos].dps_boost;
      } else {
        throw new Error(
          `equipmentDataUtils.getEquipmentDamage ERROR: Equipment can't give dps boost. EquipmentID: ${equipmentID}.`
        );
      }
    } else {
      throw new Error(
        `equipmentDataUtils.getEquipmentDamage ERROR: Invalid level pos. EquipmentID: ${equipmentID}. LevelPos: ${levelPos}`
      );
    }
  }

  function getEquipmentAttackSpeedBoost(levelPos: number): number {
    if (isValidEquipmentLevelPos(levelPos)) {
      if (canGiveAttackSpeedBoost()) {
        return equipmentData.atk_speed_boost[levelPos].atk_speed_boost;
      } else {
        throw new Error(
          `equipmentDataUtils.getEquipmentAttackSpeedBoost ERROR: Equipment can't give attack speed boost. EquipmentID: ${equipmentID}.`
        );
      }
    } else {
      throw new Error(
        `equipmentDataUtils.getEquipmentAttackSpeedBoost ERROR: Invalid level pos. EquipmentID: ${equipmentID}. LevelPos: ${levelPos}`
      );
    }
  }

  function getEquipmentAbilityAttackSpeedBoost(levelPos: number): number {
    if (isValidEquipmentLevelPos(levelPos)) {
      if (canGiveAbilityAttackSpeedBoost()) {
        return equipmentData.ability_boost!.atk_speed_boost[levelPos]
          .atk_speed_boost;
      } else {
        throw new Error(
          `equipmentDataUtils.getEquipmentAttackSpeedBoost ERROR: Equipment can't give attack speed boost. EquipmentID: ${equipmentID}.`
        );
      }
    } else {
      throw new Error(
        `equipmentDataUtils.getEquipmentAttackSpeedBoost ERROR: Invalid level pos. EquipmentID: ${equipmentID}. LevelPos: ${levelPos}`
      );
    }
  }

  function getEquipmentAbilityModify(levelPos: number): number {
    if (isValidEquipmentLevelPos(levelPos)) {
      if (canGiveAbilityModify()) {
        return equipmentData.ability_boost!.modify[levelPos].modify;
      } else {
        throw new Error(
          `equipmentDataUtils.getEquipmentAttackSpeedBoost ERROR: Equipment can't give attack speed boost. EquipmentID: ${equipmentID}.`
        );
      }
    } else {
      throw new Error(
        `equipmentDataUtils.getEquipmentAttackSpeedBoost ERROR: Invalid level pos. EquipmentID: ${equipmentID}. LevelPos: ${levelPos}`
      );
    }
  }

  function canDealDamage(): boolean {
    return equipmentData.damage.length !== 0;
  }

  function canGiveDPSBoost(): boolean {
    return equipmentData.dps_boost.length !== 0;
  }

  function canGiveAttackSpeedBoost(): boolean {
    return equipmentData.atk_speed_boost.length !== 0;
  }

  function canGiveAbilityBoost(): boolean {
    return equipmentData.ability_boost !== null;
  }

  function canGiveAbilityAttackSpeedBoost(): boolean {
    return canGiveAbilityBoost()
      ? equipmentData.ability_boost!.atk_speed_boost.length !== 0
      : false;
  }

  function canGiveAbilityModify(): boolean {
    return canGiveAbilityBoost()
      ? equipmentData.ability_boost!.modify.length !== 0
      : false;
  }

  function isValidEquipmentLevelPos(levelPos: number): boolean {
    const maxLevelPos = getEquipmentMaxLevelPos();
    const minLevelPos = getEquipmentMinLevelPos();

    return minLevelPos <= levelPos && levelPos <= maxLevelPos;
  }

  function isMaxLevelPos(levelPos: number): boolean {
    return getEquipmentMaxLevelPos() === levelPos;
  }

  function isEquipmentTypeDamage() {
    return getEquipmentType().includes(EQUIPMENT_TYPE.Damage);
  }

  function isEquipmentTypeAttack() {
    return getEquipmentType().includes(EQUIPMENT_TYPE.Attack);
  }

  function isEquipmentTypeSupport() {
    return getEquipmentType().includes(EQUIPMENT_TYPE.Support);
  }

  function isEquipmentDamageTypeDirect() {
    return getEquipmentDamageType() === DAMAGE_TYPE.Direct;
  }

  function isEquipmentDamageTypeEarthquake() {
    return getEquipmentDamageType() === DAMAGE_TYPE.Earthquake;
  }

  function isEquipmentRarityCommon() {
    return getEquipmentRarity() === RARITY.Common;
  }

  function isEquipmentRarityEpic() {
    return getEquipmentRarity() === RARITY.Epic;
  }

  return {
    equipmentData,
    getEquipmentName,
    getEquipmentImage,
    getEquipmentUser,
    getEquipmentRarity,
    getEquipmentType,
    getEquipmentDamageType,
    getEquipmentLevelCount,
    getEquipmentMaxLevelPos,
    getEquipmentMinLevelPos,
    getEquipmentLevel,
    getEquipmentDamage,
    getEquipmentDPSBoost,
    getEquipmentAttackSpeedBoost,
    getEquipmentAbilityAttackSpeedBoost,
    getEquipmentAbilityModify,
    canDealDamage,
    canGiveDPSBoost,
    canGiveAttackSpeedBoost,
    canGiveAbilityBoost,
    canGiveAbilityAttackSpeedBoost,
    canGiveAbilityModify,
    isValidEquipmentLevelPos,
    isMaxLevelPos,
    isEquipmentTypeDamage,
    isEquipmentTypeAttack,
    isEquipmentTypeSupport,
    isEquipmentDamageTypeDirect,
    isEquipmentDamageTypeEarthquake,
    isEquipmentRarityCommon,
    isEquipmentRarityEpic,
  };
}
