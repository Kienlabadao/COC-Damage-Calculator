import { GameDataType } from "data/Game";
import { manageLevelPosGameDataLocalStorage } from "utils/LocalStorageData/manageLevelPosGameDataLocalStorage";
import {
  getGameDataDefaultLevelPos,
  getZapquakeCalcLevelPosGameDataStorageKey,
} from "../../zapquakeCalcUtils";

export function manageZapquakeCalcLevelPosGameDataLocalStorage(
  gameDataID: string,
  type: GameDataType,
  isDonated: boolean = false
) {
  const key = getZapquakeCalcLevelPosGameDataStorageKey(
    gameDataID,
    type,
    isDonated
  );
  const defaultLevelPos = getGameDataDefaultLevelPos(gameDataID, type);

  return manageLevelPosGameDataLocalStorage(
    key,
    defaultLevelPos,
    gameDataID,
    type
  );
}
