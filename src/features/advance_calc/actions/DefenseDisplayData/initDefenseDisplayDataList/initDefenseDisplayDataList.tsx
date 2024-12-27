import { DefenseItem } from "features/advance_calc/objects/defenseItem";
import {
  createDefenseDisplayData,
  DefenseDisplayData,
} from "features/advance_calc/objects/defenseDisplayData";
import { DefenseLog } from "features/advance_calc/objects/defenseLog";

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
