import { ActionCard } from "features/AdvanceCalculator/components/actionCard";
import { AdvanceActionItem } from "features/AdvanceCalculator/objects/advanceActionItem";

interface Props {
  actionList: AdvanceActionItem[];
}

export function SimpleActionListDisplayer({ actionList }: Props) {
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
