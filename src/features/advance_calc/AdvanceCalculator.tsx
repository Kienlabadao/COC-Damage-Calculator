import {
  ActionListBuildingSection,
  ActionListEditingSection,
  DefensesSection,
} from "./components";
import { useInitAction } from "./hooks/Init";

export function AdvanceCalculator() {
  const [actionList, addAction, removeAction, removeAllAction] =
    useInitAction();

  return (
    <>
      <ActionListBuildingSection addAction={addAction} />

      <ActionListEditingSection
        actionList={actionList}
        removeAction={removeAction}
        removeAllAction={removeAllAction}
      />

      <DefensesSection actionList={actionList} />
    </>
  );
}
