import { SectionCardContainerWrapper } from "components/Wrapper";
import { OffensesSection } from "./offensesSection";
import { RepairsSection } from "./repairsSection";
import { InstructionSection } from "./instructionSection";
import { ModifiersSection } from "./modifiersSection";
import { useInitModifier } from "features/AdvanceCalculator/hooks/Init";
import { OffensesSectionContext } from "features/AdvanceCalculator/contexts";
import { AdvanceActionItem } from "features/AdvanceCalculator/objects/advanceActionItem";

interface Props {
  addAction: (actionItem: AdvanceActionItem, count: number) => void;
}

export function ActionListBuildingSection({ addAction }: Props) {
  const [
    modifierItemList,
    updateModifier,
    setAllModifiersToMax,
    setAllModifiersToMin,
  ] = useInitModifier();

  return (
    <SectionCardContainerWrapper>
      <h2 className="text-center">Action List Building Section</h2>
      <hr />

      <OffensesSectionContext.Provider
        value={{
          modifierItemList,
          updateModifier,
          addAction,
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
    </SectionCardContainerWrapper>
  );
}
