import { clearItem, getItem, setItem } from "utils/localStorage";
import { getZapquakeCalcUseGameDataStorageKey } from "../zapquakeCalcUtils";
import { OffenseType } from "assets/data/game";
import { isBoolean } from "utils/objectUtils";
import { DEFAULT_USE_OFFENSE } from "features/zapquake_calc/assets/calcConfig";

export function useOffenseLocalStorageUtils(
  gameDataID: string,
  type: OffenseType
) {
  const key = getZapquakeCalcUseGameDataStorageKey(gameDataID, type);
  const defaultUseOffense = DEFAULT_USE_OFFENSE;

  function storeUseOffense(useOffense: boolean): void {
    setItem(key, useOffense);
  }

  function getUseOffense(): boolean | null {
    const useOffense = getItem(key);

    if (isBoolean(useOffense)) {
      return useOffense;
    } else {
      console.warn(
        `useOffenseLocalStorageUtils.getUseOffense ERROR: Value in storage key (${key}) is not a boolean. useOffense: ${useOffense}`
      );
    }

    return null;
  }

  function getOrStoreUseOffense(): boolean {
    const useOffense = getUseOffense();

    if (useOffense !== null) {
      return useOffense;
    } else {
      console.log(
        `useOffenseLocalStorageUtils.getOrStoreUseOffense log: Value in storage key (${key}) is null. Set defaultUseOffense.`
      );

      storeUseOffense(defaultUseOffense);
      return defaultUseOffense;
    }
  }

  function clearUseOffense(): void {
    clearItem(key);
  }

  return {
    storeUseOffense,
    getUseOffense,
    getOrStoreUseOffense,
    clearUseOffense,
  };
}
