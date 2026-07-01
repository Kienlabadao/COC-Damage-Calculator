import { type BaseData, type BaseLevelData } from "../../shared/baseData";
import { type TroopId } from "../../shared/id/troopId";
import { type TroopType } from "./troopType";

export type BaseTroopData<TLevel extends BaseLevelData = BaseLevelData> =
  BaseData<TLevel> & {
    readonly id: TroopId;
    readonly troopType: readonly TroopType[];
  };
