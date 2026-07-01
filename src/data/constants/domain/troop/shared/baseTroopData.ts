import { type BaseData, type BaseLevelData } from "../../../shared/baseData";
import { type TroopId } from "../id";

export type BaseTroopData<TLevel extends BaseLevelData = BaseLevelData> =
  BaseData<TLevel> & {
    id: TroopId;
  };
