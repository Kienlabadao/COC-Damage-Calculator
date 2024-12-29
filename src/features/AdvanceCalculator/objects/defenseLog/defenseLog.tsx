import { ObjectValues } from "utils/objectUtils";
import { AdvanceDamageLogItem } from "../advanceDamageLogItem";

export const DEFENSE_STATUS = {
  Survived: "survived",
  Destroyed: "destroyed",
} as const;
export type DefenseStatus = ObjectValues<typeof DEFENSE_STATUS>;

export interface DefenseLog {
  defenseStatus: DefenseStatus;
  damageLogList: AdvanceDamageLogItem[];
}

export function createDefenseLog(
  defenseStatus: DefenseStatus,
  damageLogList: AdvanceDamageLogItem[]
): DefenseLog {
  return {
    defenseStatus,
    damageLogList,
  };
}
