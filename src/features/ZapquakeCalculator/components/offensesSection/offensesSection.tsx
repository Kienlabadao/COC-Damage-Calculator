import { SpellsSection } from "./spellsSection";
import { EquipmentsSection } from "./equipmentsSection";
import { InstructionSection } from "./instructionSection";
import { SectionCardContainerWrapper } from "components/Wrapper";

export function OffensesSection() {
  return (
    <SectionCardContainerWrapper>
      <h2 className="text-center">Offenses Section</h2>
      <hr />

      <SpellsSection />
      <hr />

      <EquipmentsSection />
      <hr />

      <InstructionSection />
    </SectionCardContainerWrapper>
  );
}
