import { clearItem, getItem, setItem } from "utils/localStorage";
import { isBoolean } from "utils/objectUtils";
import { DEFAULT_USE_TROOP_DEATH_DAMAGE } from "features/advance_calc/config";
import { getUseTroopDeathDamageStorageKey } from "../../advanceCalcUtils";

export function manageUseTroopDeathDamageLocalStorage() {
  const key = getUseTroopDeathDamageStorageKey();
  const defaultUseTroopDeathDamage = DEFAULT_USE_TROOP_DEATH_DAMAGE;

  function storeUseTroopDeathDamage(useTroopDeathDamage: boolean): void {
    setItem(key, useTroopDeathDamage);
  }

  function getUseTroopDeathDamage(): boolean | null {
    const useTroopDeathDamage = getItem(key);

    if (isBoolean(useTroopDeathDamage)) {
      return useTroopDeathDamage;
    } else {
      console.warn(
        `manageUseTroopDeathDamageLocalStorage.getUseTroopDeathDamage ERROR: Value in storage key (${key}) is not boolean. useTroopDeathDamage: ${useTroopDeathDamage}`
      );
    }

    return null;
  }

  function getOrStoreUseTroopDeathDamage(): boolean {
    const useTroopDeathDamage = getUseTroopDeathDamage();

    if (useTroopDeathDamage !== null) {
      return useTroopDeathDamage;
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
