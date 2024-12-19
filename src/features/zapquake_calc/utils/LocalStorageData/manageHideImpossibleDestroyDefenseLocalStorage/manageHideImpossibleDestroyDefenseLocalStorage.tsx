import { clearItem, getItem, setItem } from "utils/localStorage";
import { getHideImpossibleDestroyDefenseStorageKey } from "../../zapquakeCalcUtils";
import { DEFAULT_HIDE_IMPOSSIBLE_DESTROY_DEFENSE } from "features/zapquake_calc/config/config";
import { isBoolean } from "utils/objectUtils";

export function manageHideImpossibleDestroyDefenseLocalStorage() {
  const key = getHideImpossibleDestroyDefenseStorageKey();
  const defaultHideImpossibleDestroyDefense =
    DEFAULT_HIDE_IMPOSSIBLE_DESTROY_DEFENSE;

  function storeHideImpossibleDestroyDefense(
    hideImpossibleDestroyDefense: boolean
  ): void {
    setItem(key, hideImpossibleDestroyDefense);
  }

  function getHideImpossibleDestroyDefense(): boolean | null {
    const hideImpossibleDestroyDefense = getItem(key);

    if (isBoolean(hideImpossibleDestroyDefense)) {
      return hideImpossibleDestroyDefense;
    } else {
      console.warn(
        `manageHideImpossibleDestroyDefenseLocalStorage.getHideImpossibleDestroyDefense ERROR: Value in storage key (${key}) is not HideImpossibleDestroyDefense type. hideImpossibleDestroyDefense: ${hideImpossibleDestroyDefense}`
      );
    }

    return null;
  }

  function getOrStoreHideImpossibleDestroyDefense(): boolean {
    const hideImpossibleDestroyDefense = getHideImpossibleDestroyDefense();

    if (hideImpossibleDestroyDefense !== null) {
      return hideImpossibleDestroyDefense;
    } else {
      console.log(
        `manageHideImpossibleDestroyDefenseLocalStorage.getOrStoreHideImpossibleDestroyDefense log: Value in storage key (${key}) is null. Set defaultHideImpossibleDestroyDefense.`
      );

      storeHideImpossibleDestroyDefense(defaultHideImpossibleDestroyDefense);
      return defaultHideImpossibleDestroyDefense;
    }
  }

  function clearHideImpossibleDestroyDefense(): void {
    clearItem(key);
  }

  return {
    storeHideImpossibleDestroyDefense,
    getHideImpossibleDestroyDefense,
    getOrStoreHideImpossibleDestroyDefense,
    clearHideImpossibleDestroyDefense,
  };
}
