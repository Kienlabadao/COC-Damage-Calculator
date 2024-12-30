import { DefenseItem } from "features/AdvanceCalculator/objects/defenseItem";
import {
  createDefenseDisplayData,
  DefenseDisplayData,
} from "features/AdvanceCalculator/objects/defenseDisplayData";
import { DefenseLog } from "features/AdvanceCalculator/objects/defenseLog";

export function initDefenseDisplayDataList(
  defenseItemList: DefenseItem[],
  defenseLogList: Record<string, DefenseLog>,
  updateDefense: (defenseID: string, currentLevelPos: number) => void
): DefenseDisplayData[] {
  return defenseItemList.map((defenseItem) => {
    const id = defenseItem.id;
    const defenseLog = defenseLogList[defenseItem.defenseID];

    return createDefenseDisplayData(id, defenseItem, updateDefense, defenseLog);
  });
}
