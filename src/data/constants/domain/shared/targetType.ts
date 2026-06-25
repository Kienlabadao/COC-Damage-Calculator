import { ENTITY_TYPE } from "./entityType";

export const TARGET_TYPE = {
  ...ENTITY_TYPE,
  Guardian: "guardian",
  Building: "building",
  Wall: "wall",
} as const;

export type TargetType = (typeof TARGET_TYPE)[keyof typeof TARGET_TYPE];
