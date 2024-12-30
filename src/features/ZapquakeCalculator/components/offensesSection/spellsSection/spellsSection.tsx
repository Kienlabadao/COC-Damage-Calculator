import { useOffensesSectionContext } from "features/ZapquakeCalculator/contexts";
import { SpellSetting } from "./spellSetting";
import { filterOffenseItemList } from "features/ZapquakeCalculator/objects/offenseItem";
import { SpellCardContainer } from "./spellCardContainer";
import { OFFENSE_TYPE } from "data/Game";
import { DonatedSpellCardContainer } from "./donatedSpellCardContainer";

export function SpellsSection() {
  const {
    offenseItemList,
    donatedLightningSpellItem,
    updateOffense,
    setAllOffensesToMax,
    setAllOffensesToMin,
  } = useOffensesSectionContext();

  return (
    <div className="mb-5">
      <h3 className="text-center">Spell</h3>

      <SpellSetting
        donatedLightningSpellItem={donatedLightningSpellItem}
        updateOffense={updateOffense}
        setAllOffensesToMax={setAllOffensesToMax}
        setAllOffensesToMin={setAllOffensesToMin}
      />

      <div className="row row-cols-6 justify-content-evenly gap-3 mt-5">
        {donatedLightningSpellItem.use && (
          <DonatedSpellCardContainer
            key={donatedLightningSpellItem.id}
            spell={donatedLightningSpellItem}
            updateOffense={updateOffense}
          />
        )}
        {filterOffenseItemList(
          offenseItemList,
          new Set([OFFENSE_TYPE.Spell])
        ).map((offense) => (
          <SpellCardContainer
            key={offense.id}
            spell={offense}
            updateOffense={updateOffense}
          />
        ))}
      </div>
    </div>
  );
}
