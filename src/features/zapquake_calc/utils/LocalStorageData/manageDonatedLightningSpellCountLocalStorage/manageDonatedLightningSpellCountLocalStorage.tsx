import { clearItem, getItem, setItem } from "utils/localStorage";
import { isNumber } from "utils/objectUtils";
import {
  getDonatedLightningSpellCountStorageKey,
  isValidDonatedSpellCount,
} from "../../zapquakeCalcUtils";
import { DEFAULT_DONATED_SPELL_COUNT } from "features/zapquake_calc/config/config";

export function manageDonatedLightningSpellCountLocalStorage() {
  const key = getDonatedLightningSpellCountStorageKey();
  const defaultCount = DEFAULT_DONATED_SPELL_COUNT;

  function storeCount(count: number): void {
    if (isValidDonatedSpellCount(count)) {
      setItem(key, count);
    } else {
      console.warn(
        `manageDonatedLightningSpellCountLocalStorage.storeCount ERROR: Invalid count (${count}).`
      );
    }
  }

  function getCount(): number | null {
    const count = getItem(key);

    if (isNumber(count)) {
      if (isValidDonatedSpellCount(count)) {
        return count;
      } else {
        console.warn(
          `manageDonatedLightningSpellCountLocalStorage.getCount ERROR: Value in storage key (${key}) is invalid. count: ${count}`
        );
      }
    } else {
      console.warn(
        `manageDonatedLightningSpellCountLocalStorage.getCount ERROR: Value in storage key (${key}) is not number. count: ${count}`
      );
    }

    return null;
  }

  function getOrStoreCount(): number {
    const count = getCount();

    if (count !== null) {
      return count;
    } else {
      console.log(
        `manageDonatedLightningSpellCountLocalStorage.getOrStoreCount log: Value in storage key (${key}) is null. Set defaultCount.`
      );

      storeCount(defaultCount);
      return defaultCount;
    }
  }

  function clearCount(): void {
    clearItem(key);
  }

  return { storeCount, getCount, getOrStoreCount, clearCount };
}
