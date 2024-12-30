import { EQUIPMENT, SPELL } from "data/Game";
import { ObjectValues } from "utils/objectUtils";

export const EARTHQUAKE_ORDER = {
  EarthquakeSpell: SPELL.EarthquakeSpell,
  EarthquakeBoots: EQUIPMENT.EarthquakeBoots,
} as const;

export type EarthquakeOrder = ObjectValues<typeof EARTHQUAKE_ORDER>;
