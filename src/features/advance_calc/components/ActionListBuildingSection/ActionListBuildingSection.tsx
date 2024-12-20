import { SectionContainer } from "components";
import { OffenseSection } from "./OffenseSection";
import { RepairSection } from "./RepairSection";
import { InstructionSection } from "./InstructionSection";
import { ModifierSection } from "./ModifierSection";

export function ActionListBuildingSection() {
  return (
    <SectionContainer className="card-custom p-4 shadow">
      <h2 className="text-center">Action List Building Section</h2>
      <hr />

      <OffenseSection />
      <hr />

      <RepairSection />
      <hr />

      <ModifierSection />
      <hr />

      <InstructionSection />
    </SectionContainer>
  );
}
