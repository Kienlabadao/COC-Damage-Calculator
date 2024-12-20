import { clearItem, getItem, setItem } from "utils/localStorage";
import { isBoolean } from "utils/objectUtils";
import { DEFAULT_USE_TROOP_DEATH_DAMAGE } from "features/advance_calc/config";
import { getUseTroopDeathDamageStorageKey } from "../../advanceCalcUtils";

export function manageUseTroopDeathDamageLocalStorage() {
  const key = getUseTroopDeathDamageStorageKey();
  const defaultUseTroopDeathDamage = DEFAULT_USE_TROOP_DEATH_DAMAGE;

  function storeUseTroopDeathDamage(hideSurvivedDefense: boolean): void {
    setItem(key, hideSurvivedDefense);
  }

  function getUseTroopDeathDamage(): boolean | null {
    const hideSurvivedDefense = getItem(key);

    if (isBoolean(hideSurvivedDefense)) {
      return hideSurvivedDefense;
    } else {
      console.warn(
        `manageUseTroopDeathDamageLocalStorage.getUseTroopDeathDamage ERROR: Value in storage key (${key}) is not boolean. hideSurvivedDefense: ${hideSurvivedDefense}`
      );
    }

    return null;
  }

  function getOrStoreUseTroopDeathDamage(): boolean {
    const hideSurvivedDefense = getUseTroopDeathDamage();

    if (hideSurvivedDefense !== null) {
      return hideSurvivedDefense;
    } else {
      console.log(
        `manageUseTroopDeathDamageLocalStorage.getOrStoreUseTroopDeathDamage log: Value in storage key (${key}) is null. Set defaultUseTroopDeathDamage.`
      );

      storeUseTroopDeathDamage(defaultUseTroopDeathDamage);
      return defaultUseTroopDeathDamage;
    }
  }

  function clearUseTroopDeathDamage(): void {
    clearItem(key);
  }

  return {
    storeUseTroopDeathDamage,
    getUseTroopDeathDamage,
    getOrStoreUseTroopDeathDamage,
    clearUseTroopDeathDamage,
  };
}
