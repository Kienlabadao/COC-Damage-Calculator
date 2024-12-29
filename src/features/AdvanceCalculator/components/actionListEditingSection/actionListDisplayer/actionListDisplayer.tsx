import { CollapseContainer } from "components";
import { AdvanceActionItem } from "features/advance_calc/objects/advanceActionItem";
import { DetailActionListDisplayer } from "./DetailActionListDisplayer";
import { SimpleActionListDisplayer } from "./SimpleActionListDisplayer";

interface Props {
  actionList: AdvanceActionItem[];
  showDetailActionList: boolean;
}

export function ActionListDisplayer({
  actionList,
  showDetailActionList,
}: Props) {
  function renderActionList() {
    return showDetailActionList ? (
      <DetailActionListDisplayer actionList={actionList} />
    ) : (
      <SimpleActionListDisplayer actionList={actionList} />
    );
  }

  return (
    <CollapseContainer id={`show_action_list`} defaultOpen={true}>
      {renderActionList()}
    </CollapseContainer>
  );
}
