import { clearItem, getItem, setItem } from "utils/localStorage";
import { GameDataType } from "data/game";
import { isNumber } from "utils/objectUtils";
import { isValidGameDataLevelPos } from "utils/GameData/gameDataUtils";

export function manageLevelPosGameDataLocalStorage(
  key: string,
  defaultLevelPos: number,
  gameDataID: string,
  type: GameDataType
) {
  function storeLevelPos(levelPos: number): void {
    if (isValidGameDataLevelPos(levelPos, gameDataID, type)) {
      setItem(key, levelPos);
    } else {
      console.warn(
        `manageLevelPosGameDataLocalStorage.storeLevelPos ERROR: Invalid levelPos (${levelPos}).`
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
          `manageLevelPosGameDataLocalStorage.getLevelPos ERROR: Value in storage key (${key}) is invalid. levelPos: ${levelPos}`
        );
      }
    } else {
      console.warn(
        `manageLevelPosGameDataLocalStorage.getLevelPos ERROR: Value in storage key (${key}) is not a number. levelPos: ${levelPos}`
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
        `manageLevelPosGameDataLocalStorage.getOrStoreLevelPos log: Value in storage key (${key}) is null. Set defaultLevelPos.`
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
