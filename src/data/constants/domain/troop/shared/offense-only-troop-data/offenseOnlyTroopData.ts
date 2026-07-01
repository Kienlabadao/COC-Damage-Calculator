import { type BaseLevelData } from "../../../shared/baseData";
import { type BaseTroopData } from "../baseTroopData";
import {
  type OffenseData,
  type OffenseLevelData,
  type OffenseRawLevelData,
} from "../../../shared/offense/offenseData";

export type OffenseOnlyTroopRawLevelData = BaseLevelData & OffenseRawLevelData;

export type OffenseOnlyTroopLevelData = BaseLevelData & OffenseLevelData;

export type OffenseOnlyTroopData = BaseTroopData<OffenseOnlyTroopLevelData> &
  OffenseData;
