import { type HeroId } from "../../shared/id/heroId";
import { type BaseData, type BaseLevelData } from "../../shared/baseData";
import {
  type OffenseData,
  type OffenseLevelData,
  type OffenseRawLevelData,
} from "../../shared/offense/offenseData";
import {
  type TargetLevelData,
  type TargetData,
} from "../../shared/target/targetData";

export type HeroRawLevelData = BaseLevelData &
  OffenseRawLevelData &
  TargetLevelData;

export type HeroLevelData = BaseLevelData & OffenseLevelData & TargetLevelData;

export type HeroData = BaseData<HeroLevelData> &
  OffenseData &
  TargetData & {
    readonly id: HeroId;
  };
