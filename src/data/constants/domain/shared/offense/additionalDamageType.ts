export const ADDITIONAL_DAMAGE_TYPE = {
  Monolith: "monolith",
  Splash: "splash",
  PointBlank: "point_blank",
  Poison: "poison",
} as const;

export type AdditionalDamageType =
  (typeof ADDITIONAL_DAMAGE_TYPE)[keyof typeof ADDITIONAL_DAMAGE_TYPE];
