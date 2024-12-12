import { clearItem, getItem, setItem } from "utils/localStorage";
import { isBoolean } from "utils/objectUtils";

export function manageUseOffenseLocalStorage(
  key: string,
  defaultUseOffense: boolean
) {
  function storeUseOffense(useOffense: boolean): void {
    setItem(key, useOffense);
  }

  function getUseOffense(): boolean | null {
    const useOffense = getItem(key);

    if (isBoolean(useOffense)) {
      return useOffense;
    } else {
      console.warn(
        `manageUseOffenseLocalStorage.getUseOffense ERROR: Value in storage key (${key}) is not a boolean. useOffense: ${useOffense}`
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
        `manageUseOffenseLocalStorage.getOrStoreUseOffense log: Value in storage key (${key}) is null. Set defaultUseOffense.`
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
