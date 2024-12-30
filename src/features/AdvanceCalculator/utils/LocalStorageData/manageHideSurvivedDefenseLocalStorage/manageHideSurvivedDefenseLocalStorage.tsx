import { clearItem, getItem, setItem } from "utils/localStorage";
import { isBoolean } from "utils/objectUtils";
import { DEFAULT_HIDE_SURVIVED_DEFENSE } from "features/AdvanceCalculator/config";
import { getHideSurvivedDefenseStorageKey } from "../../advanceCalcUtils";

export function manageHideSurvivedDefenseLocalStorage() {
  const key = getHideSurvivedDefenseStorageKey();
  const defaultHideSurvivedDefense = DEFAULT_HIDE_SURVIVED_DEFENSE;

  function storeHideSurvivedDefense(hideSurvivedDefense: boolean): void {
    setItem(key, hideSurvivedDefense);
  }

  function getHideSurvivedDefense(): boolean | null {
    const hideSurvivedDefense = getItem(key);

    if (isBoolean(hideSurvivedDefense)) {
      return hideSurvivedDefense;
    } else {
      console.warn(
        `manageHideSurvivedDefenseLocalStorage.getHideSurvivedDefense ERROR: Value in storage key (${key}) is not boolean. hideSurvivedDefense: ${hideSurvivedDefense}`
      );
    }

    return null;
  }

  function getOrStoreHideSurvivedDefense(): boolean {
    const hideSurvivedDefense = getHideSurvivedDefense();

    if (hideSurvivedDefense !== null) {
      return hideSurvivedDefense;
    } else {
      console.log(
        `manageHideSurvivedDefenseLocalStorage.getOrStoreHideSurvivedDefense log: Value in storage key (${key}) is null. Set defaultHideSurvivedDefense.`
      );

      storeHideSurvivedDefense(defaultHideSurvivedDefense);
      return defaultHideSurvivedDefense;
    }
  }

  function clearHideSurvivedDefense(): void {
    clearItem(key);
  }

  return {
    storeHideSurvivedDefense,
    getHideSurvivedDefense,
    getOrStoreHideSurvivedDefense,
    clearHideSurvivedDefense,
  };
}
