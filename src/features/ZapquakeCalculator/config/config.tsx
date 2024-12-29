import { VALUE_BOUNDARY, ValueBoundary } from "data/constants";
import { EARTHQUAKE_ORDER } from "../data/constants";

export const DEFAULT_LEVEL: ValueBoundary = VALUE_BOUNDARY.MAX;
export const DEFAULT_USE_SPELL = true;
export const DEFAULT_USE_DONATED_LIGHTNING_SPELL = false;
export const DEFAULT_USE_EQUIPMENT = false;

export const MAX_SPELL_COUNT = 11;

export const MIN_DONATED_SPELL_COUNT = 1;
export const MAX_DONATED_SPELL_COUNT = 3;
export const DEFAULT_DONATED_SPELL_COUNT = MAX_DONATED_SPELL_COUNT;

export const DEFAULT_EARTHQUAKE_ORDER = EARTHQUAKE_ORDER.EarthquakeSpell;
export const DEFAULT_HIDE_IMPOSSIBLE_DESTROY_DEFENSE = false;
export const DEFAULT_HIDE_EQUIPMENT_DESTROYED_DEFENSE = false;
export const DEFAULT_HIDE_NORMAL_DEFENSE = false;

export const DEFAULT_SEARCH_QUERY = "";
