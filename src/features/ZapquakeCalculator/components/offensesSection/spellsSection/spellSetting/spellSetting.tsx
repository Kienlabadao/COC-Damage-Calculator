import { OFFENSE_TYPE, OffenseType } from "data/Game";
import { UseDonatedSpellCheckbox } from "../useDonatedSpellCheckbox";
import { BS_COLOR } from "data/constants";
import { memo } from "react";
import { Button } from "components/UI";
import { DonatedLightningSpellItem } from "features/ZapquakeCalculator/objects/donatedLightningSpellItem";

interface Props {
  donatedLightningSpellItem: DonatedLightningSpellItem;
  updateOffense: (
    offenseID: string,
    type: OffenseType,
    isDonated?: boolean,
    currentLevelPos?: number,
    useOffense?: boolean,
    count?: number
  ) => void;
  setAllOffensesToMax: (offenseTypeFilterList: Set<OffenseType>) => void;
  setAllOffensesToMin: (offenseTypeFilterList: Set<OffenseType>) => void;
  className?: string;
}

export const SpellSetting = memo(function SpellSetting({
  donatedLightningSpellItem,
  updateOffense,
  setAllOffensesToMax,
  setAllOffensesToMin,
  className = "",
}: Props) {
  return (
    <div className={className}>
      <div className="d-flex flex-wrap gap-2 my-2">
        <Button
          color={BS_COLOR.Gray}
          onClick={() => setAllOffensesToMax(new Set([OFFENSE_TYPE.Spell]))}
        >
          Set All Spells to Max Level
        </Button>
        <Button
          color={BS_COLOR.Gray}
          onClick={() => setAllOffensesToMin(new Set([OFFENSE_TYPE.Spell]))}
        >
          Set All Spells to Min Level
        </Button>
      </div>
      <UseDonatedSpellCheckbox
        className="mt-2"
        spell={donatedLightningSpellItem}
        updateOffense={updateOffense}
      />
    </div>
  );
});
