import {
  CollapseContainer,
  CollapseContainerButton,
  CollapseContainerContent,
  Table,
  TableColumn,
} from "components/UI";
import { BS_COLOR } from "data/constants";
import { initTableData } from "./Helper";
import { DefenseItem } from "features/ZapquakeCalculator/objects/defenseItem";
import { AdvanceDamageLogItem } from "features/AdvanceCalculator/objects/advanceDamageLogItem";

interface Props {
  defenseItem: DefenseItem;
  damageLogList: AdvanceDamageLogItem[];
}

export function DamageLogDetailDisplayer({
  defenseItem,
  damageLogList,
}: Props) {
  const columns: TableColumn[] = [
    { header: "Action", accessor: "action" },
    { header: "Type", accessor: "type" },
    { header: "DMG/REP", accessor: "damage" },
    { header: "HP", accessor: "hp" },
  ];
  const data = initTableData(defenseItem, damageLogList);

  return (
    <CollapseContainer id={"show_damage_log_detail"}>
      <div className="d-flex align-items-center gap-2">
        <h3>Detail</h3>
        <CollapseContainerButton color={BS_COLOR.Gray} />
      </div>
      <CollapseContainerContent>
        <Table columns={columns} data={data} className={`mt-3`} />
      </CollapseContainerContent>
    </CollapseContainer>
  );
}
