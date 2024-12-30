import { clearItem, getItem, setItem } from "utils/localStorage";
import { getHideEquipmentDestroyedDefenseStorageKey } from "../../zapquakeCalcUtils";
import { DEFAULT_HIDE_EQUIPMENT_DESTROYED_DEFENSE } from "features/ZapquakeCalculator/config/config";
import { isBoolean } from "utils/objectUtils";

export function manageHideEquipmentDestroyedDefenseLocalStorage() {
  const key = getHideEquipmentDestroyedDefenseStorageKey();
  const defaultHideEquipmentDestroyedDefense =
    DEFAULT_HIDE_EQUIPMENT_DESTROYED_DEFENSE;

  function storeHideEquipmentDestroyedDefense(
    hideEquipmentDestroyedDefense: boolean
  ): void {
    setItem(key, hideEquipmentDestroyedDefense);
  }

  function getHideEquipmentDestroyedDefense(): boolean | null {
    const hideEquipmentDestroyedDefense = getItem(key);

    if (isBoolean(hideEquipmentDestroyedDefense)) {
      return hideEquipmentDestroyedDefense;
    } else {
      console.warn(
        `manageHideEquipmentDestroyedDefenseLocalStorage.getHideEquipmentDestroyedDefense ERROR: Value in storage key (${key}) is not boolean. hideEquipmentDestroyedDefense: ${hideEquipmentDestroyedDefense}`
      );
    }

    return null;
  }

  function getOrStoreHideEquipmentDestroyedDefense(): boolean {
    const hideEquipmentDestroyedDefense = getHideEquipmentDestroyedDefense();

    if (hideEquipmentDestroyedDefense !== null) {
      return hideEquipmentDestroyedDefense;
    } else {
      console.log(
        `manageHideEquipmentDestroyedDefenseLocalStorage.getOrStoreHideEquipmentDestroyedDefense log: Value in storage key (${key}) is null. Set defaultHideEquipmentDestroyedDefense.`
      );

      storeHideEquipmentDestroyedDefense(defaultHideEquipmentDestroyedDefense);
      return defaultHideEquipmentDestroyedDefense;
    }
  }

  function clearHideEquipmentDestroyedDefense(): void {
    clearItem(key);
  }

  return {
    storeHideEquipmentDestroyedDefense,
    getHideEquipmentDestroyedDefense,
    getOrStoreHideEquipmentDestroyedDefense,
    clearHideEquipmentDestroyedDefense,
  };
}
