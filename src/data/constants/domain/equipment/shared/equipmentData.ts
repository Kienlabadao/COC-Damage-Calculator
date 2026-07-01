import { type BaseData, type BaseLevelData } from "../../shared/baseData";
import { type EquipmentId } from "../../shared/id/equipmentId";
import { type EquipmentRarity } from "./equipmentRarity";
import { type EquipmentType } from "./equipmentType";

export type EquipmentStatBoostData = {
  readonly damagePerSecondIncreaseInNumber?: number;
  readonly attackSpeedBetweenHitIncreaseInPercentage?: number;
};

export type EquipmentRawLevelData = BaseLevelData & {
  readonly boost?: EquipmentStatBoostData;
  readonly buff?: EquipmentStatBoostData;

  readonly extraDamagePerHit?: number;
};

export type EquipmentLevelData = EquipmentRawLevelData;

export type EquipmentData = BaseData<EquipmentLevelData> & {
  readonly id: EquipmentId;
  readonly equipmentType: readonly EquipmentType[];
  readonly equipmentRarity: EquipmentRarity;
};
