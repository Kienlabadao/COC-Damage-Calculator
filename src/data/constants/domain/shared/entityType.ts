export const ENTITY_TYPE = {
  Hero: "hero",
  Troop: "troop",
} as const;

export type EntityType = (typeof ENTITY_TYPE)[keyof typeof ENTITY_TYPE];
