import { SpellsSection } from "./spellsSection";
import { TroopsSection } from "./troopsSection";
import { HeroesSection } from "./heroesSection";

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
