import { ActionListBuildingSection } from "features/advance_calc/components/ActionListBuildingSection";
import { ActionListEditingSection } from "features/advance_calc/components/ActionListEditingSection";
import { DefenseSection } from "features/advance_calc/components/DefenseSection";

export function AdvanceCalculator() {
  return (
    <>
      <ActionListBuildingSection />

      <ActionListEditingSection />

      <DefenseSection />
    </>
  );
}
