export const EQUIPMENT_TYPE = {
  Boost: "boost",
  Buff: "buff",
  Direct: "direct",
  Damage: "damage",
  Active: "active",
  Passive: "passive",
} as const;

export type EquipmentType =
  (typeof EQUIPMENT_TYPE)[keyof typeof EQUIPMENT_TYPE];
