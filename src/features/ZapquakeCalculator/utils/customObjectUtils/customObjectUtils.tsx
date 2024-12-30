import {
  EARTHQUAKE_ORDER,
  EarthquakeOrder,
} from "features/ZapquakeCalculator/data/constants";

export function isEarthquakeOrderType(value: string): value is EarthquakeOrder {
  return Object.values(EARTHQUAKE_ORDER).includes(value as EarthquakeOrder);
}
