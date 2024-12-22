import { Button } from "components";
import { BS_COLOR } from "data/constants";
import { memo } from "react";

interface Props {
  setAllEquipmentsToMax: () => void;
  setAllEquipmentsToMin: () => void;
  className?: string;
}

export const HeroSetting = memo(function HeroSetting({
  setAllEquipmentsToMax,
  setAllEquipmentsToMin,
  className = "",
}: Props) {
  return (
    <div className={className}>
      <div className="d-flex flex-wrap gap-2 my-2">
        <Button color={BS_COLOR.Gray} onClick={() => setAllEquipmentsToMax()}>
          Set All Equipments to Max Level
        </Button>
        <Button color={BS_COLOR.Gray} onClick={() => setAllEquipmentsToMin()}>
          Set All Equipments to Min Level
        </Button>
      </div>
    </div>
  );
});
