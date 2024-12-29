import { SpellsSection } from "./spellsSection";
import { EquipmentsSection } from "./equipmentsSection";
import { InstructionSection } from "./instructionSection";
import { SectionContainerWrapper } from "components/Wrapper";

export function OffensesSection() {
  return (
    <SectionContainerWrapper className="card-custom p-4 shadow">
      <h2 className="text-center">Offenses Section</h2>
      <hr />

      <SpellsSection />
      <hr />

      <EquipmentsSection />
      <hr />

      <InstructionSection />
    </SectionContainerWrapper>
  );
}
