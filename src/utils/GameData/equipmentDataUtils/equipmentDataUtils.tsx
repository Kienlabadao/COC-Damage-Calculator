import {
  DAMAGE_TYPE,
  DamageType,
  EQUIPMENT_TYPE,
  EquipmentData,
  EquipmentType,
  Hero,
  RARITY,
  Rarity,
} from "data/game";
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

  function getEquipmentMaxLevelPos(): number {
    return getEquipmentLevelCount() - 1;
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

  function canDealDamage(): boolean {
    return equipmentData.damage.length !== 0;
  }

  function canGiveDPSBoost(): boolean {
    return equipmentData.dps_boost.length !== 0;
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
    canDealDamage,
    canGiveDPSBoost,
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
