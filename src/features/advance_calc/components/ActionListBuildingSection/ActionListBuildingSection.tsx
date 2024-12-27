import { SectionContainer } from "components";
import { OffensesSection } from "./OffensesSection";
import { RepairsSection } from "./RepairsSection";
import { InstructionSection } from "./InstructionSection";
import { ModifiersSection } from "./ModifiersSection";
import { useInitModifier } from "features/advance_calc/hooks/Init";
import { OffensesSectionContext } from "features/advance_calc/contexts";

export function ActionListBuildingSection() {
  const [
    modifierItemList,
    updateModifier,
    setAllModifiersToMax,
    setAllModifiersToMin,
  ] = useInitModifier();

  return (
    <SectionContainer className="card-custom p-4 shadow">
      <h2 className="text-center">Action List Building Section</h2>
      <hr />

      <OffensesSectionContext.Provider
        value={{
          modifierItemList,
          updateModifier,
        }}
      >
        <OffensesSection />
      </OffensesSectionContext.Provider>

      <hr />

      <RepairsSection modifierItemList={modifierItemList} />
      <hr />

      <ModifiersSection
        modifierItemList={modifierItemList}
        updateModifier={updateModifier}
        setAllModifiersToMax={setAllModifiersToMax}
        setAllModifiersToMin={setAllModifiersToMin}
      />
      <hr />

      <InstructionSection />
    </SectionContainer>
  );
}
