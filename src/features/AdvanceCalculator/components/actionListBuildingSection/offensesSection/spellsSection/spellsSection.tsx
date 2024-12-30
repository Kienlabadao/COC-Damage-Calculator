import { useOffensesSectionContext } from "features/AdvanceCalculator/contexts";
import { SpellSetting } from "./spellSetting";
import { useInitSpell } from "features/AdvanceCalculator/hooks/Init";
import { SpellCardContainer } from "./spellCardContainer";

export function SpellsSection() {
  const { addAction } = useOffensesSectionContext();

  const [spellItemList, updateSpell, setAllSpellsToMax, setAllSpellsToMin] =
    useInitSpell();

  return (
    <div className="mb-5">
      <h3 className="text-center">Spell</h3>

      <SpellSetting
        setAllSpellsToMax={setAllSpellsToMax}
        setAllSpellsToMin={setAllSpellsToMin}
      />

      <div className="row row-cols-6 justify-content-evenly gap-3 mt-5">
        {spellItemList.map((spell) => (
          <SpellCardContainer
            key={spell.id}
            spellItem={spell}
            updateSpell={updateSpell}
            addAction={addAction}
          />
        ))}
      </div>
    </div>
  );
}
