import {
  type OffenseData,
  type OffenseLevelData,
  type OffenseRawLevelData,
} from "../../../shared/offense/offenseData";
import {
  type EquipmentData,
  type EquipmentLevelData,
  type EquipmentRawLevelData,
} from "../equipmentData";

export type DirectEquipmentRawLevelData = EquipmentRawLevelData &
  OffenseRawLevelData;

export type DirectEquipmentLevelData = EquipmentLevelData & OffenseLevelData;

export type DirectEquipmentData = EquipmentData & OffenseData;
