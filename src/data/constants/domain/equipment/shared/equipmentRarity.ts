export const EQUIPMENT_RARITY = {
  Common: "common",
  Epic: "epic",
} as const;

export type EquipmentRarity =
  (typeof EQUIPMENT_RARITY)[keyof typeof EQUIPMENT_RARITY];
