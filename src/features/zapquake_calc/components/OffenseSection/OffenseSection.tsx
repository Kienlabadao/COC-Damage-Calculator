import { CardContainer } from "components";
import { SpellSection } from "./SpellSection/SpellSection";
import { EquipmentSection } from "./EquipmentSection/EquipmentSection";

export function OffenseSection() {
  return (
    <CardContainer>
      <h2 className="text-center">Offense Section</h2>
      <hr />

      <SpellSection />
      <hr />

      <EquipmentSection />
    </CardContainer>
  );
}
