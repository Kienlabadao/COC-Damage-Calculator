import { normalizeLevelData } from "../../shared/baseData.util";
import { EQUIPMENT_ID } from "../../shared/id/equipmentId";
import { EQUIPMENT_TYPE, type EquipmentType } from "../shared/equipmentType";
import type {
  EquipmentData,
  EquipmentRawLevelData,
} from "../shared/equipmentData";
import {
  normalizeEquipmentLevelData,
  normalizeEquipmentTypes,
  validateEquipmentEntityData,
} from "../shared/equipmentData.util";
import { EQUIPMENT_RARITY } from "../shared/equipmentRarity";

const rageVialRawLevels: Record<number, EquipmentRawLevelData> = {
  1: {
    level: 1,
    isMaxLevel: false,
    townHallLevel: 4,

    boost: {
      damagePerSecondIncreaseInNumber: 0.5,
    },
    buff: {
      attackSpeedBetweenHitIncreaseInPercentage: 10,
    },
  },
};

const equipmentType: readonly EquipmentType[] = normalizeEquipmentTypes([
  EQUIPMENT_TYPE.Boost,
  EQUIPMENT_TYPE.Buff,
  EQUIPMENT_TYPE.Active,
]);

export const RageVial: EquipmentData = {
  id: EQUIPMENT_ID.BarbarianKing.RageVial,
  equipmentType: equipmentType,
  equipmentRarity: EQUIPMENT_RARITY.Common,

  ...normalizeLevelData(rageVialRawLevels, (rawLevelData) =>
    normalizeEquipmentLevelData(rawLevelData, equipmentType),
  ),

  wikiUrl: "https://clashofclans.fandom.com/wiki/Rage_Vial",
};

validateEquipmentEntityData(RageVial);
