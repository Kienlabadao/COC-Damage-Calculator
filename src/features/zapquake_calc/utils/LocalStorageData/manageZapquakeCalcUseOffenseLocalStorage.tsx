import { getZapquakeCalcUseGameDataStorageKey } from "../zapquakeCalcUtils";
import { OffenseType } from "data/game";
import { DEFAULT_USE_OFFENSE } from "features/zapquake_calc/config/config";
import { manageUseOffenseLocalStorage } from "utils/LocalStorageData/manageUseOffenseLocalStorage";

export function manageZapquakeCalcUseOffenseLocalStorage(
  gameDataID: string,
  type: OffenseType,
  isDonated: boolean = false
) {
  const key = getZapquakeCalcUseGameDataStorageKey(gameDataID, type, isDonated);
  const defaultUseOffense = DEFAULT_USE_OFFENSE;

  return manageUseOffenseLocalStorage(key, defaultUseOffense);
}
