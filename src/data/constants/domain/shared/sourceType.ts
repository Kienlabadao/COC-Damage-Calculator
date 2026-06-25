import { ENTITY_TYPE } from "./entityType";

export const SOURCE_TYPE = {
  ...ENTITY_TYPE,
  Spell: "spell",
  DirectEquipment: "direct_equipment",
  Repair: "repair",
} as const;

export type SourceType = (typeof SOURCE_TYPE)[keyof typeof SOURCE_TYPE];
