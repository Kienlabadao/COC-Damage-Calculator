import { VALUE_BOUNDARY, ValueBoundary } from "data/constants";
import { MODIFIER } from "data/Game";

export const DEFAULT_LEVEL: ValueBoundary = VALUE_BOUNDARY.MAX;
export const DEFAULT_USE_EQUIPMENT = false;
export const DEFAULT_USE_ABILITY_HERO = false;

export const DEFAULT_USE_HARD_MODE = false;
export const DEFAULT_USE_TROOP_DEATH_DAMAGE = false;

export const DEFAULT_SHOW_DETAIL_ACTION_LIST = false;
export const DEFAULT_HIDE_DESTROYED_DEFENSE = false;
export const DEFAULT_HIDE_SURVIVED_DEFENSE = false;

export const DEFAULT_SEARCH_QUERY = "";

export const MAX_ACTION_COUNT = 50;

export const HIDE_MODIFIERS: string[] = [MODIFIER.RageVial];
