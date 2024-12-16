import { OFFENSE_TYPE } from "data/game";
import { useOffenseSectionContext } from "features/zapquake_calc/context/OffenseSectionContext";
import { SpellCard } from "./SpellCard";
import { DonatedSpellCard } from "./DonatedSpellCard/DonatedSpellCard";
import { SpellSectionSetting } from "./SpellSectionSetting";
import { filterOffenseItemList } from "features/zapquake_calc/objects/offenseItem";

export function SpellSection() {
  const { offenseItemList, donatedLightningSpellItem, updateOffenseItem } =
    useOffenseSectionContext();

  return (
    <div className="mb-5">
      <h3 className="text-center">Spell</h3>

      <SpellSectionSetting className="setting-container" />

      <div className="row row-cols-6 justify-content-evenly gap-3 mt-5">
        {donatedLightningSpellItem.use && (
          <DonatedSpellCard
            key={donatedLightningSpellItem.id}
            spell={donatedLightningSpellItem}
            updateOffenseItem={updateOffenseItem}
          />
        )}
        {filterOffenseItemList(
          offenseItemList,
          new Set([OFFENSE_TYPE.Spell])
        ).map((offense) => (
          <SpellCard
            key={offense.id}
            spell={offense}
            updateOffenseItem={updateOffenseItem}
          />
        ))}
      </div>
    </div>
  );
}
