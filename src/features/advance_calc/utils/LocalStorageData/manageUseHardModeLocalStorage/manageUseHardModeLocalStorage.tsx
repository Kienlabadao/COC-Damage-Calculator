import { clearItem, getItem, setItem } from "utils/localStorage";
import { isBoolean } from "utils/objectUtils";
import { DEFAULT_USE_HARD_MODE } from "features/advance_calc/config";
import { getUseHardModeStorageKey } from "../../advanceCalcUtils";

export function manageUseHardModeLocalStorage() {
  const key = getUseHardModeStorageKey();
  const defaultUseHardMode = DEFAULT_USE_HARD_MODE;

  function storeUseHardMode(hideSurvivedDefense: boolean): void {
    setItem(key, hideSurvivedDefense);
  }

  function getUseHardMode(): boolean | null {
    const hideSurvivedDefense = getItem(key);

    if (isBoolean(hideSurvivedDefense)) {
      return hideSurvivedDefense;
    } else {
      console.warn(
        `manageUseHardModeLocalStorage.getUseHardMode ERROR: Value in storage key (${key}) is not boolean. hideSurvivedDefense: ${hideSurvivedDefense}`
      );
    }

    return null;
  }

  function getOrStoreUseHardMode(): boolean {
    const hideSurvivedDefense = getUseHardMode();

    if (hideSurvivedDefense !== null) {
      return hideSurvivedDefense;
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
