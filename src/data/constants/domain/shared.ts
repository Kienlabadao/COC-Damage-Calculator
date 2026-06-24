export const OFFENSE_TYPE = {
  Hero: "hero",
  Troop: "troop",
  Spell: "spell",
  DirectEquipment: "direct_equipment",
} as const;

export type OffenseType = (typeof OFFENSE_TYPE)[keyof typeof OFFENSE_TYPE];

export const DEFENSE_TYPE = {
  Hero: "hero",
  Guardian: "guardian",
  Troop: "troop",
  Resource: "resource",
  Defense: "defense",
  Building: "building",
  Wall: "wall",
} as const;

export type DefenseType = (typeof DEFENSE_TYPE)[keyof typeof DEFENSE_TYPE];

export const DAMAGE_TYPE = {
  Direct: "direct",
  Earthquake: "earthquake",
  Burst: "burst",
} as const;

export type DamageType = (typeof DAMAGE_TYPE)[keyof typeof DAMAGE_TYPE];
