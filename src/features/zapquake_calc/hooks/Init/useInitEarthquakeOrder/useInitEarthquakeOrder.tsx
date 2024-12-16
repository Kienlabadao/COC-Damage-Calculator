import { EarthquakeOrder } from "features/zapquake_calc/data/constants";
import { manageEarthquakeOrderLocalStorage } from "features/zapquake_calc/utils/LocalStorageData/manageEarthquakeOrderLocalStorage";
import { usePersistedState } from "hooks";

export function useInitEarthquakeOrder() {
  const { getOrStoreEarthquakeOrder, storeEarthquakeOrder } =
    manageEarthquakeOrderLocalStorage();
  const [earthquakeOrder, setEarthquakeOrder] =
    usePersistedState<EarthquakeOrder>(
      getOrStoreEarthquakeOrder,
      storeEarthquakeOrder
    );

  return [earthquakeOrder, setEarthquakeOrder] as const;
}
