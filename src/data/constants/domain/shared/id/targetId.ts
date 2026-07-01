import { HERO_ID } from "./heroId";
import { TROOP_ID } from "./troopId";

export const TARGET_ID = {
  ...HERO_ID,
  ...TROOP_ID.ElixirTroop,
  ...TROOP_ID.DarkElixirTroop,
} as const;

export type TargetId = (typeof TARGET_ID)[keyof typeof TARGET_ID];
