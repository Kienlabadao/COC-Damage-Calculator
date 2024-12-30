import { SectionCardContainerWrapper } from "components/Wrapper";
import { ActionListSetting } from "./actionListSetting";
import { ActionListDisplayer } from "./actionListDisplayer";
import { useInitActionSetting } from "features/AdvanceCalculator/hooks/Init";
import { AdvanceActionItem } from "features/AdvanceCalculator/objects/advanceActionItem";
import { MAX_ACTION_COUNT } from "features/AdvanceCalculator/config";

interface Props {
  actionList: AdvanceActionItem[];
  removeAction: (count: number) => void;
  removeAllAction: () => void;
}

export function ActionListEditingSection({
  actionList,
  removeAction,
  removeAllAction,
}: Props) {
  const [showDetailActionList, setShowDetailActionList] =
    useInitActionSetting();

  const actionCount = actionList.length;

  return (
    <SectionCardContainerWrapper className="mt-5">
      <h2 className="text-center">Action List</h2>
      <hr />

      <ActionListSetting
        showDetailActionList={showDetailActionList}
        setShowDetailActionList={setShowDetailActionList}
        removeAction={removeAction}
        removeAllAction={removeAllAction}
      />
      <hr />

      <div>
        <h5 className="mb-0">{`Actions Count: ${actionCount}/${MAX_ACTION_COUNT}`}</h5>
      </div>
      <hr />

      <ActionListDisplayer
        actionList={actionList}
        showDetailActionList={showDetailActionList}
      />
    </SectionCardContainerWrapper>
  );
}
