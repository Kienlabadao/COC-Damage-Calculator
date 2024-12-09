import { clearItem, getItem, setItem } from "utils/localStorage";
import {
  getGameDataDefaultLevelPos,
  getZapquakeCalcLevelPosGameDataStorageKey,
} from "../zapquakeCalcUtils";
import { GameDataType } from "assets/data/game";
import { isNumber } from "utils/objectUtils";
import { isValidGameDataLevelPos } from "utils/GameData/gameDataUtils";

export function levelPosGameDataLocalStorageUtils(
  gameDataID: string,
  type: GameDataType
) {
  const key = getZapquakeCalcLevelPosGameDataStorageKey(gameDataID, type);
  const defaultLevelPos = getGameDataDefaultLevelPos(gameDataID, type);

  function storeLevelPos(levelPos: number): void {
    if (isValidGameDataLevelPos(levelPos, gameDataID, type)) {
      setItem(key, levelPos);
    } else {
      console.warn(
        `useLevelPosGameDataLocalStorage.storeLevelPos ERROR: Invalid levelPos (${levelPos}).`
      );
    }
  }

  function getLevelPos(): number | null {
    const levelPos = getItem(key);

    if (isNumber(levelPos)) {
      if (isValidGameDataLevelPos(levelPos, gameDataID, type)) {
        return levelPos;
      } else {
        console.warn(
          `useLevelPosGameDataLocalStorage.getLevelPos ERROR: Value in storage key (${key}) is invalid. levelPos: ${levelPos}`
        );
      }
    } else {
      console.warn(
        `useLevelPosGameDataLocalStorage.getLevelPos ERROR: Value in storage key (${key}) is not a number. levelPos: ${levelPos}`
      );
    }

    return null;
  }

  function getOrStoreLevelPos(): number {
    const levelPos = getLevelPos();

    if (levelPos !== null) {
      return levelPos;
    } else {
      console.log(
        `useLevelPosGameDataLocalStorage.getOrStoreLevelPos log: Value in storage key (${key}) is null. Set defaultLevelPos.`
      );

      storeLevelPos(defaultLevelPos);
      return defaultLevelPos;
    }
  }

  function clearLevelPos(): void {
    clearItem(key);
  }

  return { storeLevelPos, getLevelPos, getOrStoreLevelPos, clearLevelPos };
}
