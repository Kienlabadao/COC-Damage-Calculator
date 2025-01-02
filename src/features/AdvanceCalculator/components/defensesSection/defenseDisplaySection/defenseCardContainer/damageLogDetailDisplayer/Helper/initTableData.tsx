import { TableData } from "components/UI";
import { initDamageLogTableData } from "./initDamageLogTableData";
import { initDefenseTableData } from "./initDefenseTableData";
import { DefenseItem } from "features/ZapquakeCalculator/objects/defenseItem";
import { AdvanceDamageLogItem } from "features/AdvanceCalculator/objects/advanceDamageLogItem";

export function initTableData(
  defenseItem: DefenseItem,
  damageLogList: AdvanceDamageLogItem[]
): TableData[] {
  const tableData: TableData[] = [];

  tableData.push(
    initDefenseTableData(defenseItem),
    ...initDamageLogTableData(damageLogList, defenseItem)
  );

  return tableData;
}
