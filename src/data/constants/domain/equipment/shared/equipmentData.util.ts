import {
  type EquipmentData,
  type EquipmentLevelData,
  type EquipmentRawLevelData,
} from "./equipmentData";
import { EQUIPMENT_TYPE, type EquipmentType } from "./equipmentType";
import { isPresentPositiveNumber } from "../../../../../utils/number.util";

function hasEquipmentType(
  equipmentTypes: readonly EquipmentType[],
  equipmentType: EquipmentType,
): boolean {
  return equipmentTypes.includes(equipmentType);
}

function createEquipmentLevelIdentifier(
  levelData: EquipmentRawLevelData,
): string {
  return (
    "townHallLevel=" + levelData.townHallLevel + ", level=" + levelData.level
  );
}

function validateEquipmentTypeMutualExclusivity(
  equipmentTypes: readonly EquipmentType[],
): void {
  if (
    hasEquipmentType(equipmentTypes, EQUIPMENT_TYPE.Active) &&
    hasEquipmentType(equipmentTypes, EQUIPMENT_TYPE.Passive)
  ) {
    throw new Error("Equipment type cannot include both active and passive.");
  }

  if (
    hasEquipmentType(equipmentTypes, EQUIPMENT_TYPE.Direct) &&
    hasEquipmentType(equipmentTypes, EQUIPMENT_TYPE.Damage)
  ) {
    throw new Error("Equipment type cannot include both direct and damage.");
  }
}

function normalizeEquipmentLevelByType(
  rawLevelData: EquipmentRawLevelData,
  equipmentTypes: readonly EquipmentType[],
): EquipmentLevelData {
  const levelIdentifier = createEquipmentLevelIdentifier(rawLevelData);
  const normalizedLevelData: EquipmentLevelData = {
    ...rawLevelData,
  };

  if (
    hasEquipmentType(equipmentTypes, EQUIPMENT_TYPE.Buff) &&
    normalizedLevelData.buff === undefined
  ) {
    throw new Error(
      "buff is required when equipmentType includes buff (" +
        levelIdentifier +
        ").",
    );
  }

  if (
    hasEquipmentType(equipmentTypes, EQUIPMENT_TYPE.Boost) &&
    normalizedLevelData.boost === undefined
  ) {
    throw new Error(
      "boost is required when equipmentType includes boost (" +
        levelIdentifier +
        ").",
    );
  }

  if (
    hasEquipmentType(equipmentTypes, EQUIPMENT_TYPE.Damage) &&
    !isPresentPositiveNumber(normalizedLevelData.extraDamagePerHit)
  ) {
    throw new Error(
      "extraDamagePerHit is required and must be a positive number when equipmentType includes damage (" +
        levelIdentifier +
        ").",
    );
  }

  return normalizedLevelData;
}

export function normalizeEquipmentTypes(
  equipmentTypes: readonly EquipmentType[],
): readonly EquipmentType[] {
  if (equipmentTypes.length === 0) {
    throw new Error("Equipment equipmentType must include at least one type.");
  }

  const seenEquipmentTypes = new Set<EquipmentType>();

  for (const equipmentType of equipmentTypes) {
    if (seenEquipmentTypes.has(equipmentType)) {
      throw new Error("Duplicate equipment type: " + equipmentType);
    }

    seenEquipmentTypes.add(equipmentType);
  }

  return [...equipmentTypes];
}

function normalizeEquipmentValidationTypes(
  equipmentTypes: readonly EquipmentType[],
): readonly EquipmentType[] {
  const normalizedEquipmentTypes = normalizeEquipmentTypes(equipmentTypes);
  validateEquipmentTypeMutualExclusivity(normalizedEquipmentTypes);

  return normalizedEquipmentTypes;
}

export function validateEquipmentEntityData(
  equipmentData: EquipmentData,
): void {
  normalizeEquipmentValidationTypes(equipmentData.equipmentType);
}

export function normalizeEquipmentLevelData(
  rawLevelData: EquipmentRawLevelData,
  equipmentTypes: readonly EquipmentType[],
): EquipmentLevelData {
  const normalizedEquipmentTypes =
    normalizeEquipmentValidationTypes(equipmentTypes);

  return normalizeEquipmentLevelByType(rawLevelData, normalizedEquipmentTypes);
}
