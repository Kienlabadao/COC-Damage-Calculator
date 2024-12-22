import { RepairData } from "data/game";
import { REPAIR_IMG_PATH } from "data/constants";

export function repairDataUtils(repairID: string) {
  const repairData = RepairData[repairID];
  if (repairData === undefined) {
    throw new Error(`getRepair ERROR: Repair with ID "${repairID}" not found.`);
  }

  function getRepairName(): string {
    return repairData.name;
  }

  function getRepairImage(levelPos: number): string {
    return `${REPAIR_IMG_PATH}/${repairID}/${levelPos}.webp`;
  }

  function getRepairLevelCount(): number {
    return repairData.repair.length;
  }

  function getRepairMaxLevelPos(): number {
    return getRepairLevelCount() - 1;
  }

  function getRepairMinLevelPos(): number {
    return 0;
  }

  function getRepairLevel(levelPos: number): number {
    if (isValidRepairLevelPos(levelPos)) {
      return repairData.repair[levelPos].level;
    } else {
      throw new Error(
        `gameDataUtils.getRepairLevel ERROR: Invalid level pos. RepairID: ${repairID}. LevelPos: ${levelPos}`
      );
    }
  }

  function getRepairRepair(levelPos: number): number {
    if (isValidRepairLevelPos(levelPos)) {
      return repairData.repair[levelPos].repair;
    } else {
      throw new Error(
        `gameDataUtils.getRepairLevel ERROR: Invalid level pos. RepairID: ${repairID}. LevelPos: ${levelPos}`
      );
    }
  }

  function isValidRepairLevelPos(levelPos: number): boolean {
    const maxLevelPos = getRepairMaxLevelPos();
    const minLevelPos = getRepairMinLevelPos();

    return minLevelPos <= levelPos && levelPos <= maxLevelPos;
  }

  function isMaxLevelPos(levelPos: number): boolean {
    return getRepairMaxLevelPos() === levelPos;
  }

  return {
    repairData,
    getRepairName,
    getRepairImage,
    getRepairLevelCount,
    getRepairMaxLevelPos,
    getRepairMinLevelPos,
    getRepairLevel,
    getRepairRepair,
    isValidRepairLevelPos,
    isMaxLevelPos,
  };
}
