export const DAMAGE_TYPE = {
  Direct: "direct",
  Earthquake: "earthquake",
  Burst: "burst",
} as const;

export type DamageType = (typeof DAMAGE_TYPE)[keyof typeof DAMAGE_TYPE];
