import { Button } from "components";
import { BS_COLOR } from "data/constants";
import { memo } from "react";

interface Props {
  setAllModifiersToMax: () => void;
  setAllModifiersToMin: () => void;
  className?: string;
}

export const ModifierSetting = memo(function ModifierSetting({
  setAllModifiersToMax,
  setAllModifiersToMin,
  className = "",
}: Props) {
  return (
    <div className={className}>
      <div className="d-flex flex-wrap gap-2 my-2">
        <Button color={BS_COLOR.Gray} onClick={() => setAllModifiersToMax()}>
          Set All Modifiers to Max Level
        </Button>
        <Button color={BS_COLOR.Gray} onClick={() => setAllModifiersToMin()}>
          Set All Modifiers to Min Level
        </Button>
      </div>
    </div>
  );
});
