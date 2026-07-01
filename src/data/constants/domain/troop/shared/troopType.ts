export const TROOP_TYPE = {
  Elixir: "elixir",
  DarkElixir: "dark_elixir",
  Sub: "sub",
  Super: "super",
  Temporary: "temporary",
  Hero: "hero",
  Equipment: "equipment",
} as const;

export type TroopType = (typeof TROOP_TYPE)[keyof typeof TROOP_TYPE];
