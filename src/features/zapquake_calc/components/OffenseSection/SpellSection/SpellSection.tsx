import { OFFENSE_TYPE } from "data/game";
import { useOffenseSectionContext } from "features/zapquake_calc/context/OffenseSectionContext";
import { SpellCard } from "./SpellCard";
import { UseDonatedSpellCheckbox } from "./UseDonatedSpellCheckbox";

export function SpellSection() {
  const {
    offenseItemList,
    donatedLightningSpellItem,
    updateOffenseItem,
    setAllOffensesToMax,
    setAllOffensesToMin,
  } = useOffenseSectionContext();

  return (
    <div className="mb-5">
      <h3 className="text-center">Spell</h3>
      <div className="setting-container">
        <div className="d-flex flex-wrap gap-2 my-2">
          <button
            className="btn btn-secondary"
            type="button"
            value="max"
            onClick={() => setAllOffensesToMax(new Set([OFFENSE_TYPE.Spell]))}
          >
            Set All Spells to Max Level
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            value="min"
            onClick={() => setAllOffensesToMin(new Set([OFFENSE_TYPE.Spell]))}
          >
            Set All Spells to Min Level
          </button>
        </div>
        <div className="d-flex align-items-center">
          <div className="d-flex justify-content-center align-items-center mt-2">
            <UseDonatedSpellCheckbox
              spell={donatedLightningSpellItem}
              updateOffenseItem={updateOffenseItem}
            />
          </div>
        </div>
      </div>
      <div className="row row-cols-6 justify-content-evenly gap-3 mt-5">
        {donatedLightningSpellItem.use && (
          <SpellCard
            key={donatedLightningSpellItem.id}
            spell={donatedLightningSpellItem}
            isDonated={true}
            updateOffenseItem={updateOffenseItem}
          />
        )}
        {offenseItemList
          .filter((offense) => offense.type === OFFENSE_TYPE.Spell)
          .map((offense) => (
            <SpellCard
              key={offense.id}
              spell={offense}
              isDonated={false}
              updateOffenseItem={updateOffenseItem}
            />
          ))}
      </div>
    </div>
  );
}
