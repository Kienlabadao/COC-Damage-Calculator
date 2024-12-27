import { ObjectValues } from "utils/objectUtils";
import { SpellCountItem } from "../spellCountItem";

export const DEFENSE_STATUS = {
  Normal: "normal",
  EquipmentDestroyed: "equipment_destroyed",
  ImpossibleDestroy: "Impossible_destroy",
} as const;
export type DefenseStatus = ObjectValues<typeof DEFENSE_STATUS>;

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
