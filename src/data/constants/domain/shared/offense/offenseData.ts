import { type TargetType } from "../target/targetType";
import { type AdditionalDamageType } from "./additionalDamageType";
import { type DamageType } from "./damageType";
import { type OffenseModifierType } from "./offenseModifierType";

export type OffenseStageDamageData = {
  chargeDuration: number;
  damagePerHit: number;
};

export type OffenseMonolithDamageData = {
  minHousingSpace: number;
  maxHousingSpace?: number;

  extraDamageInPercentage: number;
};

export type OffenseSplashDamageData = {
  minRadius: number;
  maxRadius?: number;

  extraDamagePerHit: number;
};

export type OffenseDamageData = {
  targetType?: TargetType[];

  damagePerHit?: number;
  earthquakeDamagePerHit?: number;
  deathDamage?: number;
  auraDamagePerHit?: number;

  stageDamages?: OffenseStageDamageData[];

  monolithDamages?: OffenseMonolithDamageData[];
  splashDamages?: OffenseSplashDamageData[];
  pointBlankDamagePerHit?: number;
};

export type OffenseRawLevelData = {
  damageData: OffenseDamageData[];
};

export type OffenseDamageByTargetData = Partial<
  Record<TargetType, OffenseDamageData>
>;

export type OffenseLevelData = {
  genericDamageData: OffenseDamageData;
  damageDataByTargetType: OffenseDamageByTargetData;
};

export type OffenseModifierData = {
  modifierType: OffenseModifierType;
  preferenceTargetType?: TargetType;

  damagePerHitMultiplierInPercentage?: number;
  attackSpeedBetweenHitMultiplierInPercentage?: number;
};

export type OffenseSeparateAttackSpeedData = {
  targetType: TargetType[];

  attackSpeedBetweenHit?: number;
  attackSpeedBetweenBurst?: number;
  auraDamageAttackSpeed?: number;
};

export type OffenseData = {
  damageType: DamageType[];
  additionalDamageType?: AdditionalDamageType;

  attackSpeedBetweenHit?: number;
  attackSpeedBetweenBurst?: number;
  auraDamageAttackSpeed?: number;
  separateAttackSpeed?: OffenseSeparateAttackSpeedData[];

  modifiers?: OffenseModifierData[];

  canAttackAir: boolean;

  maxAttackCountPerBurst?: number;

  maxDeathDamageHitCount?: number;

  maxChainTargets?: number;
  chainDamageReductionInPercentage?: number;

  instaKillTargets?: TargetType[];
};
