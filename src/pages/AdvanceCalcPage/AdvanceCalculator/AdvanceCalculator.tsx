import { ActionListBuildingSection } from "features/advance_calc/components/ActionListBuildingSection";
import { ActionListEditingSection } from "features/advance_calc/components/ActionListEditingSection";
import { DefensesSection } from "features/advance_calc/components/DefensesSection";

export function AdvanceCalculator() {
  return (
    <>
      <ActionListBuildingSection />

      <ActionListEditingSection />

      <DefensesSection />
    </>
  );
}
