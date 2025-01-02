import { Table, TableColumn } from "components/UI";
import { AdvanceActionItem } from "features/AdvanceCalculator/objects/advanceActionItem";
import { initTableData } from "./Helper";

interface Props {
  actionList: AdvanceActionItem[];
}

export function DetailActionListDisplayer({ actionList }: Props) {
  const columns: TableColumn[] = [
    { header: "Action", accessor: "action" },
    { header: "Modifier", accessor: "modifier" },
    { header: "Manage", accessor: "manage" },
  ];
  const data = initTableData(actionList);

  return <Table columns={columns} data={data} />;
}
