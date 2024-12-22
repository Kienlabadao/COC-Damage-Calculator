import { SpellsSection } from "./SpellsSection";
import { TroopsSection } from "./TroopsSection";
import { HeroesSection } from "./HeroesSection";

export function OffensesSection() {
  return (
    <>
      <SpellsSection />
      <hr />
      <TroopsSection />
      <hr />
      <HeroesSection />
    </>
  );
}
