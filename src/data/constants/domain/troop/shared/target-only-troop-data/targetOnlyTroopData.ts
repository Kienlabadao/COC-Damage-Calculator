import { type BaseLevelData } from "../../../shared/baseData";
import { type BaseTroopData } from "../baseTroopData";
import {
  type TargetLevelData,
  type TargetData,
} from "../../../shared/target/targetData";

export type TargetOnlyTroopRawLevelData = BaseLevelData & TargetLevelData;

export type TargetOnlyTroopLevelData = BaseLevelData & TargetLevelData;

export type TargetOnlyTroopData = BaseTroopData<TargetOnlyTroopLevelData> &
  TargetData;
