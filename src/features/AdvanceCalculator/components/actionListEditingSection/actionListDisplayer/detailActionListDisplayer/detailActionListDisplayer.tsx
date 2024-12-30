import { Column, TableRow } from "components/UI";
import { ActionCard } from "features/AdvanceCalculator/components/actionCard";
import { AdvanceActionItem } from "features/AdvanceCalculator/objects/advanceActionItem";

interface Props {
  actionList: AdvanceActionItem[];
}

// function initTableData({ actionList }: Props): TableRow[] {
//   return actionList.map((action, index) => {
//     const actionData = (
//       <ActionCard
//         action={action}
//         index={index + 1}
//       />
//     );
//   });
// }

export function DetailActionListDisplayer({ actionList }: Props) {
  const columns: Column[] = [
    { header: "Action", accessor: "action" },
    { header: "Modifier", accessor: "modifier" },
    { header: "Manage", accessor: "manage" },
  ];

  const data: TableRow[] = [
    {
      name: <strong>Laptop</strong>,
      price: <span style={{ color: "green" }}>$999.99</span>,
      stock: <span style={{ color: "green" }}>In Stock</span>,
    },
    {
      name: <em>Smartphone</em>,
      price: <span style={{ color: "red" }}>$499.99</span>,
      stock: <span style={{ color: "red" }}>Out of Stock</span>,
    },
    {
      name: "Headphones",
      price: "$199.99",
      stock: <span style={{ color: "green" }}>In Stock</span>,
    },
  ];

  return (
    <div className="d-flex justify-content-center justify-content-md-start flex-wrap gap-1 mt-3">
      {actionList.map((action, index) => (
        <ActionCard
          key={`${action.actionID}_action_${index}`}
          action={action}
          index={index + 1}
        />
      ))}
    </div>
  );
}
