import { OFFENSE_TYPE } from "data/game";
import { useOffenseSectionContext } from "features/zapquake_calc/context/OffenseSectionContext";
import { UseDonatedSpellCheckbox } from "../UseDonatedSpellCheckbox";
import { Button } from "components";
import { BS_COLOR } from "data/constants";

interface Props {
  className?: string;
}

export function SpellSectionSetting({ className = "" }: Props) {
  const {
    donatedLightningSpellItem,
    updateOffense,
    setAllOffensesToMax,
    setAllOffensesToMin,
  } = useOffenseSectionContext();

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
      <div className="d-flex align-items-center">
        <div className="d-flex justify-content-center align-items-center mt-2">
          <UseDonatedSpellCheckbox
            spell={donatedLightningSpellItem}
            updateOffense={updateOffense}
          />
        </div>
      </div>
    </div>
  );
}
