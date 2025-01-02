import {
  CollapseContainer,
  CollapseContainerButton,
  CollapseContainerContent,
} from "components/UI";
import { AdvanceActionItem } from "features/AdvanceCalculator/objects/advanceActionItem";
import { DetailActionListDisplayer } from "./detailActionListDisplayer";
import { SimpleActionListDisplayer } from "./simpleActionListDisplayer";
import { BS_COLOR } from "data/constants";

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

  const actionCount = actionList.length;

  return (
    <>
      {actionCount > 0 && (
        <CollapseContainer id={`show_action_list`} defaultOpen={true}>
          <CollapseContainerButton color={BS_COLOR.Gray} />
          <CollapseContainerContent>
            <div className={`mt-3`}>{renderActionList()}</div>
          </CollapseContainerContent>
        </CollapseContainer>
      )}
    </>
  );
}
