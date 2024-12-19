import { Button } from "components";
import { BS_COLOR } from "data/constants";
import { OFFENSE_TYPE, OffenseType } from "data/game";
import { EarthquakeOrderDropdown } from "./EarthquakeOrderDropdown";
import { memo } from "react";
import { EarthquakeOrder } from "features/zapquake_calc/data/constants";

interface Props {
  earthquakeOrder: EarthquakeOrder;
  setEarthquakeOrder: React.Dispatch<React.SetStateAction<EarthquakeOrder>>;
  setAllOffensesToMax: (offenseTypeFilterList: Set<OffenseType>) => void;
  setAllOffensesToMin: (offenseTypeFilterList: Set<OffenseType>) => void;
  className?: string;
}

export const EquipmentSetting = memo(function EquipmentSetting({
  earthquakeOrder,
  setEarthquakeOrder,
  setAllOffensesToMax,
  setAllOffensesToMin,
  className = "",
}: Props) {
  return (
    <div className={className}>
      <div className="d-flex flex-wrap gap-2 my-2">
        <Button
          color={BS_COLOR.Gray}
          onClick={() => setAllOffensesToMax(new Set([OFFENSE_TYPE.Equipment]))}
        >
          Set All Equipments to Max Level
        </Button>
        <Button
          color={BS_COLOR.Gray}
          onClick={() => setAllOffensesToMin(new Set([OFFENSE_TYPE.Equipment]))}
        >
          Set All Equipments to Min Level
        </Button>
      </div>

      <EarthquakeOrderDropdown
        className="d-flex align-items-center flex-wrap gap-1"
        earthquakeOrder={earthquakeOrder}
        setEarthquakeOrder={setEarthquakeOrder}
      />
    </div>
  );
});
