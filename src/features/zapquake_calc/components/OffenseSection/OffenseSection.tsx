import { SpellSection } from "./SpellSection/SpellSection";
import { EquipmentSection } from "./EquipmentSection/EquipmentSection";
import { SectionContainer } from "components";
import { InstructionSection } from "./InstructionSection";

export function OffenseSection() {
  return (
    <SectionContainer className="card-custom p-4 shadow">
      <h2 className="text-center">Offense Section</h2>
      <hr />

      <SpellSection />
      <hr />

      <EquipmentSection />
      <hr />

      <InstructionSection />
    </SectionContainer>
  );
}
