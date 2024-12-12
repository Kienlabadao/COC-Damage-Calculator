import { EARTHQUAKE_ORDER, EarthquakeOrder } from "../data/constants";

export function isEarthquakeOrderType(value: string): value is EarthquakeOrder {
  return Object.values(EARTHQUAKE_ORDER).includes(value as EarthquakeOrder);
}
