import { DefenseItem } from "features/ZapquakeCalculator/objects/defenseItem";
import {
  createDefenseDisplayData,
  DefenseDisplayData,
} from "features/ZapquakeCalculator/objects/defenseDisplayData";
import { DefenseLog } from "features/ZapquakeCalculator/objects/defenseLog";

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
