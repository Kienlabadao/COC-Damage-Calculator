import { SpellsSection } from "./SpellsSection";
import { EquipmentsSection } from "./EquipmentsSection";
import { SectionContainer } from "components";
import { InstructionSection } from "./InstructionSection";

export function OffensesSection() {
  return (
    <SectionContainer className="card-custom p-4 shadow">
      <h2 className="text-center">Offenses Section</h2>
      <hr />

      <SpellsSection />
      <hr />

      <EquipmentsSection />
      <hr />

      <InstructionSection />
    </SectionContainer>
  );
}
