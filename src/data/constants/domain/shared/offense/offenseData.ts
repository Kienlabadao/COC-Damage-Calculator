import { type TargetType } from "../target/targetType";
import { type AdditionalDamageType } from "./additionalDamageType";
import { type DamageType } from "./damageType";
import type { OffenseModifierData } from "./offenseModifierData";

export type OffenseStageDamageData = {
  readonly chargeDuration: number;
  readonly damagePerHit: number;
};

export type OffenseMonolithDamageData = {
  readonly minHousingSpace: number;
  readonly maxHousingSpace?: number;

  readonly extraDamageInPercentage: number;
};

export type OffenseSplashDamageData = {
  readonly minRadius: number;
  readonly maxRadius?: number;

  readonly extraDamagePerHit: number;
};

export type OffenseDamageData = {
  readonly targetType?: readonly TargetType[];

  readonly damagePerHit?: number;
  readonly earthquakeDamagePerHit?: number;
  readonly deathDamage?: number;
  readonly auraDamagePerHit?: number;

  readonly stageDamages?: readonly OffenseStageDamageData[];

  readonly monolithDamages?: readonly OffenseMonolithDamageData[];
  readonly splashDamages?: readonly OffenseSplashDamageData[];
  readonly pointBlankDamagePerHit?: number;
};

export type OffenseRawLevelData = {
  readonly damageData: readonly OffenseDamageData[];
};

export type OffenseDamageByTargetData = Partial<
  Readonly<Record<TargetType, OffenseDamageData>>
>;

export type OffenseLevelData = {
  readonly genericDamageData: OffenseDamageData;
  readonly damageDataByTargetType: OffenseDamageByTargetData;
};

export type OffenseSeparateAttackSpeedData = {
  readonly targetType: readonly TargetType[];

  readonly attackSpeedBetweenHit?: number;
  readonly attackSpeedBetweenBurst?: number;
  readonly auraDamageAttackSpeed?: number;
};

export type OffenseData = {
  readonly damageType: readonly DamageType[];
  readonly additionalDamageType?: AdditionalDamageType;

  readonly attackSpeedBetweenHit?: number;
  readonly attackSpeedBetweenBurst?: number;
  readonly auraDamageAttackSpeed?: number;
  readonly separateAttackSpeed?: readonly OffenseSeparateAttackSpeedData[];

  readonly modifiers?: readonly OffenseModifierData[];

  readonly canAttackAir: boolean;

  readonly maxAttackCountPerBurst?: number;

  readonly maxDeathDamageHitCount?: number;

  readonly maxChainTargets?: number;
  readonly chainDamageReductionInPercentage?: number;

  readonly instaKillTargets?: readonly TargetType[];
};
