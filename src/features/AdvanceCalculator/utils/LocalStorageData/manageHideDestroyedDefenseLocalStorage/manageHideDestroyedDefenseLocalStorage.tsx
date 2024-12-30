import { clearItem, getItem, setItem } from "utils/localStorage";
import { isBoolean } from "utils/objectUtils";
import { DEFAULT_HIDE_DESTROYED_DEFENSE } from "features/AdvanceCalculator/config";
import { getHideDestroyedDefenseStorageKey } from "../../advanceCalcUtils";

export function manageHideDestroyedDefenseLocalStorage() {
  const key = getHideDestroyedDefenseStorageKey();
  const defaultHideDestroyedDefense = DEFAULT_HIDE_DESTROYED_DEFENSE;

  function storeHideDestroyedDefense(hideDestroyedDefense: boolean): void {
    setItem(key, hideDestroyedDefense);
  }

  function getHideDestroyedDefense(): boolean | null {
    const hideDestroyedDefense = getItem(key);

    if (isBoolean(hideDestroyedDefense)) {
      return hideDestroyedDefense;
    } else {
      console.warn(
        `manageHideDestroyedDefenseLocalStorage.getHideDestroyedDefense ERROR: Value in storage key (${key}) is not boolean. hideDestroyedDefense: ${hideDestroyedDefense}`
      );
    }

    return null;
  }

  function getOrStoreHideDestroyedDefense(): boolean {
    const hideDestroyedDefense = getHideDestroyedDefense();

    if (hideDestroyedDefense !== null) {
      return hideDestroyedDefense;
    } else {
      console.log(
        `manageHideDestroyedDefenseLocalStorage.getOrStoreHideDestroyedDefense log: Value in storage key (${key}) is null. Set defaultHideDestroyedDefense.`
      );

      storeHideDestroyedDefense(defaultHideDestroyedDefense);
      return defaultHideDestroyedDefense;
    }
  }

  function clearHideDestroyedDefense(): void {
    clearItem(key);
  }

  return {
    storeHideDestroyedDefense,
    getHideDestroyedDefense,
    getOrStoreHideDestroyedDefense,
    clearHideDestroyedDefense,
  };
}
