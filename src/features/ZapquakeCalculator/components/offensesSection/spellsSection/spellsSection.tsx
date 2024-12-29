import { useOffensesSectionContext } from "features/ZapquakeCalculator/contexts";
import { SpellSetting } from "./spellSetting";
import { DonatedSpellCard } from "./donatedSpellCardContainer";
import { filterOffenseItemList } from "features/AdvanceCalculator/objects/offenseItem";
import { OFFENSE_TYPE } from "data/Game";
import { SpellCard } from "./spellCard";

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
        className="setting-container"
        donatedLightningSpellItem={donatedLightningSpellItem}
        updateOffense={updateOffense}
        setAllOffensesToMax={setAllOffensesToMax}
        setAllOffensesToMin={setAllOffensesToMin}
      />

      <div className="row row-cols-6 justify-content-evenly gap-3 mt-5">
        {donatedLightningSpellItem.use && (
          <DonatedSpellCard
            key={donatedLightningSpellItem.id}
            spell={donatedLightningSpellItem}
            updateOffense={updateOffense}
          />
        )}
        {filterOffenseItemList(
          offenseItemList,
          new Set([OFFENSE_TYPE.Spell])
        ).map((offense) => (
          <SpellCard
            key={offense.id}
            spell={offense}
            updateOffense={updateOffense}
          />
        ))}
      </div>
    </div>
  );
}
