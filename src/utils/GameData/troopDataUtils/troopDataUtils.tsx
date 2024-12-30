import {
  DAMAGE_TYPE,
  DamageType,
  TROOP_TYPE,
  TroopData,
  TroopType,
} from "data/Game";
import { OFFENSE_IMG_PATH } from "data/constants";

export function troopDataUtils(troopID: string) {
  const troopData = TroopData[troopID];
  if (troopData === undefined) {
    throw new Error(
      `troopDataUtils ERROR: Troop with ID "${troopID}" not found.`
    );
  }

  function getTroopName(): string {
    return troopData.name;
  }

  function getTroopImage(levelPos: number): string {
    if (isTroopTypeNormal()) {
      const level = getTroopLevel(levelPos);

      return `${OFFENSE_IMG_PATH}/troops/${troopID}/${level}.webp`;
    } else if (isTroopTypeSuper()) {
      return `${OFFENSE_IMG_PATH}/troops/${troopID}/${troopID}.webp`;
    } else {
      throw new Error(
        `troopDataUtils.getTroopImage ERROR: troopType (${getTroopType()}) is not supported.`
      );
    }
  }

  function getTroopType(): TroopType {
    return troopData.troop_type;
  }

  function getTroopDamageType(): DamageType {
    return troopData.damage_type;
  }

  function getTroopLevelCount(): number {
    return canDealDamage()
      ? troopData.damage.length
      : troopData.death_damage.length;
  }

  function getTroopMaxLevelPos(): number {
    return getTroopLevelCount() - 1;
  }

  function getTroopMinLevelPos(): number {
    return 0;
  }

  function getTroopLevel(levelPos: number): number {
    if (isValidTroopLevelPos(levelPos)) {
      return canDealDamage()
        ? troopData.damage[levelPos].level
        : troopData.death_damage[levelPos].level;
    } else {
      throw new Error(
        `troopDataUtils.getTroopLevel ERROR: Invalid level pos. TroopID: ${troopID}. LevelPos: ${levelPos}`
      );
    }
  }

  function getTroopDamage(levelPos: number): number {
    if (isValidTroopLevelPos(levelPos)) {
      if (canDealDamage()) {
        return troopData.damage[levelPos].damage;
      } else {
        throw new Error(
          `troopDataUtils.getTroopDamage ERROR: Troop can't deal damage. TroopID: ${troopID}.`
        );
      }
    } else {
      throw new Error(
        `troopDataUtils.getTroopDamage ERROR: Invalid level pos. TroopID: ${troopID}. LevelPos: ${levelPos}`
      );
    }
  }

  function getTroopDeathDamage(levelPos: number): number {
    if (isValidTroopLevelPos(levelPos)) {
      if (canDealDeathDamage()) {
        return troopData.death_damage[levelPos].death_damage;
      } else {
        throw new Error(
          `troopDataUtils.getTroopDeathDamage ERROR: Troop can't deal death damage. TroopID: ${troopID}.`
        );
      }
    } else {
      throw new Error(
        `troopDataUtils.getTroopDeathDamage ERROR: Invalid level pos. TroopID: ${troopID}. LevelPos: ${levelPos}`
      );
    }
  }

  function canDealDamage(): boolean {
    return troopData.damage.length !== 0;
  }

  function canDealDeathDamage(): boolean {
    return troopData.death_damage.length !== 0;
  }

  function isValidTroopLevelPos(levelPos: number): boolean {
    const maxLevelPos = getTroopMaxLevelPos();
    const minLevelPos = getTroopMinLevelPos();

    return minLevelPos <= levelPos && levelPos <= maxLevelPos;
  }

  function isMaxLevelPos(levelPos: number): boolean {
    return getTroopMaxLevelPos() === levelPos;
  }

  function isTroopDamageTypeDirect() {
    return getTroopDamageType() === DAMAGE_TYPE.Direct;
  }

  function isTroopDamageTypeEarthquake() {
    return getTroopDamageType() === DAMAGE_TYPE.Earthquake;
  }

  function isTroopTypeNormal() {
    return getTroopType() === TROOP_TYPE.Normal;
  }

  function isTroopTypeSuper() {
    return getTroopType() === TROOP_TYPE.Super;
  }

  return {
    troopData,
    getTroopName,
    getTroopImage,
    getTroopType,
    getTroopDamageType,
    getTroopLevelCount,
    getTroopMaxLevelPos,
    getTroopMinLevelPos,
    getTroopLevel,
    getTroopDamage,
    getTroopDeathDamage,
    canDealDamage,
    canDealDeathDamage,
    isValidTroopLevelPos,
    isMaxLevelPos,
    isTroopDamageTypeDirect,
    isTroopDamageTypeEarthquake,
    isTroopTypeNormal,
    isTroopTypeSuper,
  };
}
