import { useOffensesSectionContext } from "features/advance_calc/contexts";
import { SpellCardWrapper } from "./SpellCardWrapper";
import { SpellSetting } from "./SpellSetting";
import { useInitSpell } from "features/advance_calc/hooks/Init";

export function SpellsSection() {
  const { addAction } = useOffensesSectionContext();

  const [spellItemList, updateSpell, setAllSpellsToMax, setAllSpellsToMin] =
    useInitSpell();

  return (
    <div className="mb-5">
      <h3 className="text-center">Spell</h3>

      <SpellSetting
        className="setting-container"
        setAllSpellsToMax={setAllSpellsToMax}
        setAllSpellsToMin={setAllSpellsToMin}
      />

      <div className="row row-cols-6 justify-content-evenly gap-3 mt-5">
        {spellItemList.map((spell) => (
          <SpellCardWrapper
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
