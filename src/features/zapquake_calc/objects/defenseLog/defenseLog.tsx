import { DefenseStatus } from "features/zapquake_calc/actions/DefenseItem";
import { SpellCountItem } from "../spellCountItem";

export interface DefenseLog {
  defenseStatus: DefenseStatus;
  spellCountList: SpellCountItem[][];
}

export function createDefenseLog(
  defenseStatus: DefenseStatus,
  spellCountList: SpellCountItem[][]
): DefenseLog {
  return {
    defenseStatus,
    spellCountList,
  };
}
