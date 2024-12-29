import { GameDataType } from "data/game";
import { manageLevelPosGameDataLocalStorage } from "utils/LocalStorageData/manageLevelPosGameDataLocalStorage";
import {
  getAdvanceCalcLevelPosGameDataStorageKey,
  getGameDataDefaultLevelPos,
} from "../../advanceCalcUtils";

export function manageAdvanceCalcLevelPosGameDataLocalStorage(
  gameDataID: string,
  type: GameDataType
) {
  const key = getAdvanceCalcLevelPosGameDataStorageKey(gameDataID, type);
  const defaultLevelPos = getGameDataDefaultLevelPos(gameDataID, type);

  return manageLevelPosGameDataLocalStorage(
    key,
    defaultLevelPos,
    gameDataID,
    type
  );
}
