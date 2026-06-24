import { type NestedValues } from "@/types/NestedValues";
import { type DamageType, type DefenseType, type OffenseType } from "../shared";

export const OFFENSE_ID = {
  Hero: {
    BarbarianKing: "barbarian-king",
    ArcherQueen: "archer-queen",
    MinionPrince: "minion-prince",
    GrandWarden: "grand-warden",
    RoyalChampion: "royal-champion",
    DragonDuke: "dragon-duke",
  },
  // Troop: {
  //   Barbarian: "barbarian",
  //   Archer: "archer",
  // },
} as const;

export type OffenseId = NestedValues<typeof OFFENSE_ID>;

export const OFFENSE_TROOP_TYPE = {
  ElixirTroop: "elixir_troop",
  DarkElixirTroop: "dark_elixir_troop",
  SubTroop: "sub_troop",
  SuperTroop: "super_troop",
} as const;

export type OffenseTroopType =
  (typeof OFFENSE_TROOP_TYPE)[keyof typeof OFFENSE_TROOP_TYPE];

export const OFFENSE_MODIFIER_TYPE = {
  PreferenceTarget: "preference_target",
  Alone: "alone",
  Enraged: "enraged",
} as const;

export type OffenseModifierType =
  (typeof OFFENSE_MODIFIER_TYPE)[keyof typeof OFFENSE_MODIFIER_TYPE];

export type OffenseStageDamageData = {
  stage: number;

  damagePerHit: number;
};

export type OffenseLevelData = {
  level: number;
  isMaxLevel: boolean;
  townHallLevel: number;

  damagePerHit?: number;

  stageDamages?: OffenseStageDamageData[];

  auraDamagePerHit?: number;
  deathDamagePerHit?: number;
  wallDamagePerHit?: number;
  pointBlankDamagePerHit?: number;
};

export type OffenseModifierData = {
  modifierType: OffenseModifierType;
  preferenceDefenseType?: DefenseType;

  damagePerHitMultiplierInPercentage?: number;
  attackSpeedBetweenHitMultiplierInPercentage?: number;
};

export type OffenseData = {
  id: OffenseId;
  type: OffenseType;
  troopType?: OffenseTroopType;

  damageType: DamageType;
  attackSpeedBetweenHit: number;
  attackSpeedBetweenBurst?: number;
  auraDamageAttackSpeed?: number;
  separateWallDamageAttackSpeed?: number;

  levels: Record<number, OffenseLevelData>;

  modifiers?: OffenseModifierData[];

  canDealDeathDamage: boolean;
  canDealAuraDamage: boolean;
  haveSeparateWallDamage: boolean;
  haveStageDamage: boolean;
  canDealPointBlankDamage: boolean;

  canDealChainDamage: boolean;
  maxChainTargets?: number;
  chainDamageMultiplierInPercentage?: number;

  canDealPoisonDamage: boolean;

  isTemporary: boolean;
  isTemporaryAvailable?: boolean;

  wikiUrl?: string;
};
