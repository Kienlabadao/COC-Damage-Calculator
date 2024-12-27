import { SectionContainer } from "components";
import { ActionListSetting } from "./ActionListSetting";
import { ActionListDisplayer } from "./ActionListDisplayer";
import { useInitActionSetting } from "features/advance_calc/hooks/Init/useInitActionSetting";
import { AdvanceActionItem } from "features/advance_calc/objects/advanceActionItem";
import { MAX_ACTION_COUNT } from "features/advance_calc/config";

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
    <SectionContainer className="card-custom p-4 shadow my-5">
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
    </SectionContainer>
  );
}
