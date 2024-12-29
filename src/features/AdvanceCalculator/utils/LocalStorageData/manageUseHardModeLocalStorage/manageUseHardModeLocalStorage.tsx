import { clearItem, getItem, setItem } from "utils/localStorage";
import { isBoolean } from "utils/objectUtils";
import { DEFAULT_USE_HARD_MODE } from "features/advance_calc/config";
import { getUseHardModeStorageKey } from "../../advanceCalcUtils";

export function manageUseHardModeLocalStorage() {
  const key = getUseHardModeStorageKey();
  const defaultUseHardMode = DEFAULT_USE_HARD_MODE;

  function storeUseHardMode(useHardMode: boolean): void {
    setItem(key, useHardMode);
  }

  function getUseHardMode(): boolean | null {
    const useHardMode = getItem(key);

    if (isBoolean(useHardMode)) {
      return useHardMode;
    } else {
      console.warn(
        `manageUseHardModeLocalStorage.getUseHardMode ERROR: Value in storage key (${key}) is not boolean. useHardMode: ${useHardMode}`
      );
    }

    return null;
  }

  function getOrStoreUseHardMode(): boolean {
    const useHardMode = getUseHardMode();

    if (useHardMode !== null) {
      return useHardMode;
    } else {
      console.log(
        `manageUseHardModeLocalStorage.getOrStoreUseHardMode log: Value in storage key (${key}) is null. Set defaultUseHardMode.`
      );

      storeUseHardMode(defaultUseHardMode);
      return defaultUseHardMode;
    }
  }

  function clearUseHardMode(): void {
    clearItem(key);
  }

  return {
    storeUseHardMode,
    getUseHardMode,
    getOrStoreUseHardMode,
    clearUseHardMode,
  };
}
