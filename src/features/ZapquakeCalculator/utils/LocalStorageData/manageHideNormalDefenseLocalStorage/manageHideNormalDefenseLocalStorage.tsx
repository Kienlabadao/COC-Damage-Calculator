import { clearItem, getItem, setItem } from "utils/localStorage";
import { getHideNormalDefenseStorageKey } from "../../zapquakeCalcUtils";
import { DEFAULT_HIDE_NORMAL_DEFENSE } from "features/zapquake_calc/config/config";
import { isBoolean } from "utils/objectUtils";

export function manageHideNormalDefenseLocalStorage() {
  const key = getHideNormalDefenseStorageKey();
  const defaultHideNormalDefense = DEFAULT_HIDE_NORMAL_DEFENSE;

  function storeHideNormalDefense(hideNormalDefense: boolean): void {
    setItem(key, hideNormalDefense);
  }

  function getHideNormalDefense(): boolean | null {
    const hideNormalDefense = getItem(key);

    if (isBoolean(hideNormalDefense)) {
      return hideNormalDefense;
    } else {
      console.warn(
        `manageHideNormalDefenseLocalStorage.getHideNormalDefense ERROR: Value in storage key (${key}) is not boolean. hideNormalDefense: ${hideNormalDefense}`
      );
    }

    return null;
  }

  function getOrStoreHideNormalDefense(): boolean {
    const hideNormalDefense = getHideNormalDefense();

    if (hideNormalDefense !== null) {
      return hideNormalDefense;
    } else {
      console.log(
        `manageHideNormalDefenseLocalStorage.getOrStoreHideNormalDefense log: Value in storage key (${key}) is null. Set defaultHideNormalDefense.`
      );

      storeHideNormalDefense(defaultHideNormalDefense);
      return defaultHideNormalDefense;
    }
  }

  function clearHideNormalDefense(): void {
    clearItem(key);
  }

  return {
    storeHideNormalDefense,
    getHideNormalDefense,
    getOrStoreHideNormalDefense,
    clearHideNormalDefense,
  };
}
