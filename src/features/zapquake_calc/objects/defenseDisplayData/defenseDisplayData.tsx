import { DefenseItem } from "../defenseItem";
import { DefenseLog } from "../defenseLog";

export interface DefenseDisplayData {
  id: string;
  defenseItem: DefenseItem;
  updateDefense: (defenseID: string, currentLevelPos: number) => void;
  defenseLog: DefenseLog;
}

export function createDefenseDisplayData(
  id: string,
  defenseItem: DefenseItem,
  updateDefense: (defenseID: string, currentLevelPos: number) => void,
  defenseLog: DefenseLog
): DefenseDisplayData {
  return {
    id,
    defenseItem,
    updateDefense,
    defenseLog,
  };
}
