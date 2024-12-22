import { Button } from "components";
import { BS_COLOR } from "data/constants";
import { memo } from "react";

interface Props {
  setAllRepairsToMax: () => void;
  setAllRepairsToMin: () => void;
  className?: string;
}

export const RepairSetting = memo(function RepairSetting({
  setAllRepairsToMax,
  setAllRepairsToMin,
  className = "",
}: Props) {
  return (
    <div className={className}>
      <div className="d-flex flex-wrap gap-2 my-2">
        <Button color={BS_COLOR.Gray} onClick={() => setAllRepairsToMax()}>
          Set All Repairs to Max Level
        </Button>
        <Button color={BS_COLOR.Gray} onClick={() => setAllRepairsToMin()}>
          Set All Repairs to Min Level
        </Button>
      </div>
    </div>
  );
});
