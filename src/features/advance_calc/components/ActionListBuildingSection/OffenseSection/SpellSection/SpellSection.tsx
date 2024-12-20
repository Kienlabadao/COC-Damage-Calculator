import { OFFENSE_TYPE } from "data/game";
import { memo } from "react";
import { SpellCardWrapper } from "./SpellCardWrapper";
import { useInitOffense } from "features/advance_calc/hooks/Init";
import { SpellSetting } from "./SpellSetting";

export const SpellSection = memo(function SpellSection() {
  const [
    spellItemList,
    updateOffense,
    setAllOffensesToMax,
    setAllOffensesToMin,
  ] = useInitOffense(new Set([OFFENSE_TYPE.Spell]));

  return (
    <div className="mb-5">
      <h3 className="text-center">Spell</h3>

      <SpellSetting
        className="setting-container"
        setAllOffensesToMax={setAllOffensesToMax}
        setAllOffensesToMin={setAllOffensesToMin}
      />

      <div className="row row-cols-6 justify-content-evenly gap-3 mt-5">
        {spellItemList.map((offense) => (
          <SpellCardWrapper
            key={offense.id}
            spell={offense}
            updateOffense={updateOffense}
          />
        ))}
      </div>
    </div>
  );
});
