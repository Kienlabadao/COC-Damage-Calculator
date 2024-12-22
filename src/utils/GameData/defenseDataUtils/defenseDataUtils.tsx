import { DEFENSE_IMG_PATH, OFFENSE_IMG_PATH } from "data/constants";
import { DEFENSE_TYPE, DefenseData, DefenseType } from "data/game";

export function defenseDataUtils(defenseID: string) {
  const defenseData = DefenseData[defenseID];
  if (defenseData === undefined) {
    throw new Error(
      `getDefense ERROR: Defense with ID "${defenseID}" not found.`
    );
  }

  function getDefenseName(): string {
    return defenseData.name;
  }

  function getDefenseImage(levelPos: number): string {
    const type = getDefenseType();

    switch (type) {
      case DEFENSE_TYPE.Building:
        const level = getDefenseLevel(levelPos);

        return `${DEFENSE_IMG_PATH}${defenseID}/${level}.webp`;
      case DEFENSE_TYPE.Hero:
        return `${OFFENSE_IMG_PATH}/heroes/${defenseID}/${defenseID}.webp`;
      default:
        throw new Error(
          `gameDataUtils.getDefenseImage ERROR: Defense type (${type}) is not supported.`
        );
    }
  }

  function getDefenseType(): DefenseType {
    return defenseData.type;
  }

  function getDefenseImmune(): string[] {
    return defenseData.immune;
  }

  function getDefenseLevelCount(): number {
    return defenseData.hp.length;
  }

  function getDefenseMaxLevelPos(): number {
    return getDefenseLevelCount() - 1;
  }

  function getDefenseMinLevelPos(): number {
    return 0;
  }

  function getDefenseLevel(levelPos: number): number {
    if (isValidDefenseLevelPos(levelPos)) {
      return defenseData.hp[levelPos].level;
    } else {
      throw new Error(
        `gameDataUtils.getDefenseLevel ERROR: Invalid level pos. DefenseID: ${defenseID}. LevelPos: ${levelPos}`
      );
    }
  }

  function getDefenseSuperchargeLevel(levelPos: number): number {
    if (isValidDefenseLevelPos(levelPos)) {
      return defenseData.hp[levelPos].supercharge_level;
    } else {
      throw new Error(
        `gameDataUtils.getDefenseLevel ERROR: Invalid level pos. DefenseID: ${defenseID}. LevelPos: ${levelPos}`
      );
    }
  }

  function getDefenseHP(levelPos: number): number {
    if (isValidDefenseLevelPos(levelPos)) {
      return defenseData.hp[levelPos].hp;
    } else {
      throw new Error(
        `gameDataUtils.getDefenseLevel ERROR: Invalid level pos. DefenseID: ${defenseID}. LevelPos: ${levelPos}`
      );
    }
  }

  function isMaxLevel(levelPos: number): boolean {
    const level = getDefenseLevel(levelPos);
    const maxLevel = getDefenseLevel(getDefenseMaxLevelPos());

    return level === maxLevel;
  }

  function isValidDefenseLevelPos(levelPos: number): boolean {
    const maxLevelPos = getDefenseMaxLevelPos();
    const minLevelPos = getDefenseMinLevelPos();

    return minLevelPos <= levelPos && levelPos <= maxLevelPos;
  }

  function isMaxLevelPos(levelPos: number): boolean {
    return getDefenseMaxLevelPos() === levelPos;
  }

  function isImmune(offenseID: string): boolean {
    return getDefenseImmune().includes(offenseID);
  }

  return {
    defenseData,
    getDefenseName,
    getDefenseImage,
    getDefenseType,
    getDefenseImmune,
    getDefenseLevelCount,
    getDefenseMaxLevelPos,
    getDefenseMinLevelPos,
    getDefenseLevel,
    getDefenseSuperchargeLevel,
    getDefenseHP,
    isMaxLevel,
    isValidDefenseLevelPos,
    isMaxLevelPos,
    isImmune,
  };
}
