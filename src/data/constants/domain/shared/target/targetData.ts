import { type TargetType } from "./targetType";

export type TargetLevelData = {
  readonly hp: number;
};

export type TargetData = {
  readonly targetType: readonly TargetType[];
};
