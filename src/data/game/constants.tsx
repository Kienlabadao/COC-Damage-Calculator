import { ObjectValues } from "utils/objectUtils";
import { OFFENSE_TYPE } from "./offense";

export const HARD_MODE_HERO_DAMAGE_MODIFIER = 0.95;
export const MODIFIER_HERO_EFFECTIVENESS = 0.5;

export const MIN_SELECTED_EQUIPMENT = 2;
export const MAX_SELECTED_EQUIPMENT = 2;

export const GAME_DATA_TYPE = {
  ...OFFENSE_TYPE,
  Modifier: "modifier",
  Defense: "defense",
  Repair: "repair",
} as const;
export type GameDataType = ObjectValues<typeof GAME_DATA_TYPE>;
