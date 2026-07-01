import { type TargetType } from "../target/targetType";
import { type DamageType } from "./damageType";
import { isPresentPositiveNumber } from "../../../../../utils/number.util";
import {
  type OffenseDamageData,
  type OffenseData,
  type OffenseLevelData,
} from "./offenseData";

export type OffenseEntityValidationData = Pick<
  OffenseData,
  | "damageType"
  | "attackSpeedBetweenHit"
  | "attackSpeedBetweenBurst"
  | "auraDamageAttackSpeed"
  | "maxChainTargets"
  | "chainDamageReductionInPercentage"
>;

function hasDamageType(
  damageTypes: readonly DamageType[],
  targetType: DamageType,
): boolean {
  return damageTypes.includes(targetType);
}

export function validateOffenseEntityData(
  data: OffenseEntityValidationData,
): void {
  const {
    damageType,
    attackSpeedBetweenHit,
    attackSpeedBetweenBurst,
    auraDamageAttackSpeed,
    maxChainTargets,
    chainDamageReductionInPercentage,
  } = data;

  if (damageType.length === 0) {
    throw new Error("Offense damageType must include at least one type.");
  }

  const requiresAttackSpeedBetweenHit =
    hasDamageType(damageType, "direct") ||
    hasDamageType(damageType, "burst") ||
    hasDamageType(damageType, "chain") ||
    hasDamageType(damageType, "stage");

  if (
    requiresAttackSpeedBetweenHit &&
    !isPresentPositiveNumber(attackSpeedBetweenHit)
  ) {
    throw new Error(
      "attackSpeedBetweenHit is required and must be a positive number when damageType includes direct, burst, chain, or stage.",
    );
  }

  if (
    hasDamageType(damageType, "burst") &&
    !isPresentPositiveNumber(attackSpeedBetweenBurst)
  ) {
    throw new Error(
      "attackSpeedBetweenBurst is required and must be a positive number when damageType includes burst.",
    );
  }

  if (
    hasDamageType(damageType, "aura") &&
    !isPresentPositiveNumber(auraDamageAttackSpeed)
  ) {
    throw new Error(
      "auraDamageAttackSpeed is required and must be a positive number when damageType includes aura.",
    );
  }

  if (hasDamageType(damageType, "chain")) {
    if (!isPresentPositiveNumber(maxChainTargets)) {
      throw new Error(
        "maxChainTargets is required and must be a positive number when damageType includes chain.",
      );
    }

    if (!isPresentPositiveNumber(chainDamageReductionInPercentage)) {
      throw new Error(
        "chainDamageReductionInPercentage is required and must be a positive number when damageType includes chain.",
      );
    }
  }
}

function validateOffenseDamageEntry(
  damageEntry: OffenseDamageData,
  damageTypes: readonly DamageType[],
  index: number,
): void {
  const isDirectOrBurst =
    hasDamageType(damageTypes, "direct") || hasDamageType(damageTypes, "burst");

  if (isDirectOrBurst && !isPresentPositiveNumber(damageEntry.damagePerHit)) {
    throw new Error(
      "damageData[" +
        index +
        "].damagePerHit is required and must be a positive number when damageType includes direct or burst.",
    );
  }

  if (
    hasDamageType(damageTypes, "earthquake") &&
    !isPresentPositiveNumber(damageEntry.earthquakeDamagePerHit)
  ) {
    throw new Error(
      "damageData[" +
        index +
        "].earthquakeDamagePerHit is required and must be a positive number when damageType includes earthquake.",
    );
  }

  if (
    hasDamageType(damageTypes, "death") &&
    !isPresentPositiveNumber(damageEntry.deathDamage)
  ) {
    throw new Error(
      "damageData[" +
        index +
        "].deathDamage is required and must be a positive number when damageType includes death.",
    );
  }

  if (
    hasDamageType(damageTypes, "aura") &&
    !isPresentPositiveNumber(damageEntry.auraDamagePerHit)
  ) {
    throw new Error(
      "damageData[" +
        index +
        "].auraDamagePerHit is required and must be a positive number when damageType includes aura.",
    );
  }

  if (hasDamageType(damageTypes, "stage")) {
    const stageDamages = damageEntry.stageDamages;

    if (stageDamages === undefined || stageDamages.length === 0) {
      throw new Error(
        "damageData[" +
          index +
          "].stageDamages is required and must be a non-empty array when damageType includes stage.",
      );
    }

    for (
      let stageIndex = 0;
      stageIndex < stageDamages.length;
      stageIndex += 1
    ) {
      const stageDamage = stageDamages[stageIndex];

      if (!isPresentPositiveNumber(stageDamage.chargeDuration)) {
        throw new Error(
          "damageData[" +
            index +
            "].stageDamages[" +
            stageIndex +
            "].chargeDuration must be a positive number.",
        );
      }

      if (!isPresentPositiveNumber(stageDamage.damagePerHit)) {
        throw new Error(
          "damageData[" +
            index +
            "].stageDamages[" +
            stageIndex +
            "].damagePerHit must be a positive number.",
        );
      }
    }
  }
}

export function normalizeOffenseDamageTypes(
  damageTypes: readonly DamageType[],
): readonly DamageType[] {
  if (damageTypes.length === 0) {
    throw new Error("Offense damageType must include at least one type.");
  }

  const seenDamageTypes = new Set<DamageType>();

  for (const damageType of damageTypes) {
    if (seenDamageTypes.has(damageType)) {
      throw new Error("Duplicate offense damageType: " + damageType);
    }

    seenDamageTypes.add(damageType);
  }

  return [...damageTypes];
}

export function normalizeOffenseDamageData(
  damageData: readonly OffenseDamageData[],
  damageTypes: readonly DamageType[],
): OffenseLevelData {
  if (damageData.length === 0) {
    throw new Error("Offense level must have at least 1 damageData entry.");
  }

  const normalizedDamageTypes = normalizeOffenseDamageTypes(damageTypes);

  let genericDamageData: OffenseDamageData | undefined;
  const damageDataByTargetType: Partial<Record<TargetType, OffenseDamageData>> =
    {};

  for (let i = 0; i < damageData.length; i += 1) {
    const currentDamageData = damageData[i];
    validateOffenseDamageEntry(currentDamageData, normalizedDamageTypes, i);

    const targets = currentDamageData.targetType;
    const isGeneric = targets === undefined || targets.length === 0;

    if (isGeneric) {
      if (genericDamageData !== undefined) {
        throw new Error(
          "Only 1 generic damageData entry is allowed (without targetType).",
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
      "Offense level must include 1 generic damageData entry without targetType.",
    );
  }

  return {
    genericDamageData,
    damageDataByTargetType,
  };
}
