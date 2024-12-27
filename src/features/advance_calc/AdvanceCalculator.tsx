import {
  ActionListBuildingSection,
  ActionListEditingSection,
  DefensesSection,
} from "./components";
import { useInitAction } from "./hooks/Init";

export function AdvanceCalculator() {
  const [actionList, addAction, removeAction, removeAllAction] =
    useInitAction();
  console.log(actionList);
  return (
    <>
      <ActionListBuildingSection addAction={addAction} />

      <ActionListEditingSection />

      <DefensesSection />
    </>
  );
}
