import { SpellSection } from "./SpellSection";
import { TroopSection } from "./TroopSection";
import { HeroSection } from "./HeroSection";

export function OffenseSection() {
  return (
    <>
      <SpellSection />
      <hr />
      <TroopSection />
      <hr />
      <HeroSection />
    </>
  );
}
