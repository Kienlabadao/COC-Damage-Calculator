import { type TargetId } from "../id/targetId";
import { type TargetType } from "../target/targetType";

export const OFFENSE_MODIFIER_TYPE = {
  PreferenceTarget: "preference_target",
  RoyalRampage: "royal_rampage",
  Tantrum: "tantrum",
  Enraged: "enraged",
} as const;

export type OffenseModifierType =
  (typeof OFFENSE_MODIFIER_TYPE)[keyof typeof OFFENSE_MODIFIER_TYPE];

export type OffenseModifierData = {
  modifierType: OffenseModifierType;
  preferenceTargetType?: TargetType;
  specificPreferenceTargetType?: TargetId[];

  damagePerHitMultiplierInPercentage?: number;
  attackSpeedBetweenHitMultiplierInPercentage?: number;
};
