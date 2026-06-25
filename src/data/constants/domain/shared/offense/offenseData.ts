import { type TargetType } from "../targetType";
import { type DamageType } from "./damageType";
import { type OffenseModifierType } from "./offenseModifierType";

export type OffenseDamageData = {
  preferenceTargetType?: TargetType[];

  damagePerHit: number;
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

export type OffenseData = {
  damageType: DamageType;
  attackSpeedBetweenHit: number;
  attackSpeedBetweenBurst?: number;

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

  canOneShotWalls?: boolean;

  isTemporary: boolean;
  isTemporaryAvailable?: boolean;

  wikiUrl?: string;
};

export function normalizeOffenseDamageData(
  damageData: OffenseDamageData[],
): OffenseLevelData {
  if (damageData.length === 0) {
    throw new Error("Offense level must have at least 1 damageData entry.");
  }

  let genericDamageData: OffenseDamageData | undefined;
  const damageDataByTargetType: OffenseDamageByTargetData = {};

  for (let i = 0; i < damageData.length; i += 1) {
    const currentDamageData = damageData[i];
    const targets = currentDamageData.preferenceTargetType;
    const isGeneric = targets === undefined || targets.length === 0;

    if (isGeneric) {
      if (genericDamageData !== undefined) {
        throw new Error(
          "Only 1 generic damageData entry is allowed (without preferenceTargetType).",
        );
      }

      genericDamageData = currentDamageData;
      continue;
    }

    const seenInCurrentDamageData = new Set<TargetType>();

    for (const targetType of targets) {
      if (seenInCurrentDamageData.has(targetType)) {
        throw new Error(
          "Duplicate target type in a single damageData entry at index " +
            i +
            ": " +
            targetType,
        );
      }

      if (damageDataByTargetType[targetType] !== undefined) {
        throw new Error(
          "Target type appears in more than one damageData entry: " +
            targetType,
        );
      }

      seenInCurrentDamageData.add(targetType);
      damageDataByTargetType[targetType] = currentDamageData;
    }
  }

  if (genericDamageData === undefined) {
    throw new Error(
      "Offense level must include 1 generic damageData entry without preferenceTargetType.",
    );
  }

  return {
    genericDamageData,
    damageDataByTargetType,
  };
}
