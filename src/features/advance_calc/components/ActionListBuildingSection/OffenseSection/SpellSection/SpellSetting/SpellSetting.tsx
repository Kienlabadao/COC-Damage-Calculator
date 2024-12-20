import { OFFENSE_TYPE, OffenseType } from "data/game";
import { Button } from "components";
import { BS_COLOR } from "data/constants";
import { memo } from "react";

interface Props {
  setAllOffensesToMax: (offenseTypeFilterList: Set<OffenseType>) => void;
  setAllOffensesToMin: (offenseTypeFilterList: Set<OffenseType>) => void;
  className?: string;
}

export const SpellSetting = memo(function SpellSetting({
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
    </div>
  );
});
