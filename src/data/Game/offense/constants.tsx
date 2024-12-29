import { ObjectValues } from "utils/objectUtils";

export const DAMAGE_TYPE = {
  Direct: "direct",
  Earthquake: "earthquake",
} as const;
export type DamageType = ObjectValues<typeof DAMAGE_TYPE>;

export const OFFENSE_TYPE = {
  Equipment: "equipment",
  Hero: "hero",
  Spell: "spell",
  Troop: "troop",
};
export type OffenseType = ObjectValues<typeof OFFENSE_TYPE>;
