import { OFFENSE_TYPE } from "data/game";
import { useOffenseSectionContext } from "features/zapquake_calc/context/OffenseSectionContext";
import { SpellCard } from "./SpellCard";
import { DonatedSpellCard } from "./DonatedSpellCard/DonatedSpellCard";
import { SpellSetting } from "./SpellSetting";
import { filterOffenseItemList } from "features/zapquake_calc/objects/offenseItem";

export function SpellSection() {
  const {
    offenseItemList,
    donatedLightningSpellItem,
    updateOffense,
    setAllOffensesToMax,
    setAllOffensesToMin,
  } = useOffenseSectionContext();

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
