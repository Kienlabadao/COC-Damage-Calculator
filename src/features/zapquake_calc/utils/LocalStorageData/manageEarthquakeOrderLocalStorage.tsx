import { clearItem, getItem, setItem } from "utils/localStorage";
import { getEarthquakeOrderStorageKey } from "../zapquakeCalcUtils";
import { DEFAULT_EARTHQUAKE_ORDER } from "features/zapquake_calc/config/config";
import { EarthquakeOrder } from "features/zapquake_calc/data/constants";
import { isEarthquakeOrderType } from "../customObjectUtils";

export function manageEarthquakeOrderLocalStorage() {
  const key = getEarthquakeOrderStorageKey();
  const defaultEarthquakeOrder = DEFAULT_EARTHQUAKE_ORDER;

  function storeEarthquakeOrder(earthquakeOrder: EarthquakeOrder): void {
    setItem(key, earthquakeOrder);
  }

  function getEarthquakeOrder(): EarthquakeOrder | null {
    const earthquakeOrder = getItem(key);

    if (isEarthquakeOrderType(earthquakeOrder)) {
      return earthquakeOrder;
    } else {
      console.warn(
        `manageEarthquakeOrderLocalStorage.getEarthquakeOrder ERROR: Value in storage key (${key}) is not EarthquakeOrder type. earthquakeOrder: ${earthquakeOrder}`
      );
    }

    return null;
  }

  function getOrStoreEarthquakeOrder(): EarthquakeOrder {
    const earthquakeOrder = getEarthquakeOrder();

    if (earthquakeOrder !== null) {
      return earthquakeOrder;
    } else {
      console.log(
        `manageEarthquakeOrderLocalStorage.getOrStoreEarthquakeOrder log: Value in storage key (${key}) is null. Set defaultEarthquakeOrder.`
      );

      storeEarthquakeOrder(defaultEarthquakeOrder);
      return defaultEarthquakeOrder;
    }
  }

  function clearEarthquakeOrder(): void {
    clearItem(key);
  }

  return {
    storeEarthquakeOrder,
    getEarthquakeOrder,
    getOrStoreEarthquakeOrder,
    clearEarthquakeOrder,
  };
}
