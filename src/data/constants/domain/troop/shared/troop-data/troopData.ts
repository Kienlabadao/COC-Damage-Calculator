import { type BaseLevelData } from "../../../shared/baseData";
import { type BaseTroopData } from "../baseTroopData";
import {
  type OffenseData,
  type OffenseLevelData,
  type OffenseRawLevelData,
} from "../../../shared/offense/offenseData";
import {
  type TargetLevelData,
  type TargetData,
} from "../../../shared/target/targetData";

export type TroopRawLevelData = BaseLevelData &
  OffenseRawLevelData &
  TargetLevelData;

export type TroopLevelData = BaseLevelData & OffenseLevelData & TargetLevelData;

export type TroopData = BaseTroopData<TroopLevelData> &
  OffenseData &
  TargetData;
