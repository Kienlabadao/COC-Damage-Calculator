import { Button } from "components";
import { BS_COLOR } from "data/constants";
import { memo } from "react";

interface Props {
  setAllSpellsToMax: () => void;
  setAllSpellsToMin: () => void;
  className?: string;
}

export const SpellSetting = memo(function SpellSetting({
  setAllSpellsToMax,
  setAllSpellsToMin,
  className = "",
}: Props) {
  return (
    <div className={className}>
      <div className="d-flex flex-wrap gap-2 my-2">
        <Button color={BS_COLOR.Gray} onClick={() => setAllSpellsToMax()}>
          Set All Spells to Max Level
        </Button>
        <Button color={BS_COLOR.Gray} onClick={() => setAllSpellsToMin()}>
          Set All Spells to Min Level
        </Button>
      </div>
    </div>
  );
});
