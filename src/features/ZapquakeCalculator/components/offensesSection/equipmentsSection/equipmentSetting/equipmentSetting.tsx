import { Button } from "components/UI";
import { BS_COLOR } from "data/constants";
import { OFFENSE_TYPE, OffenseType } from "data/Game";
import { memo } from "react";
import { EarthquakeOrder } from "features/ZapquakeCalculator/data/constants";
import { EarthquakeOrderDropdown } from "./earthquakeOrderDropdown";
import { SettingContainerWrapper } from "components/Wrapper";

interface Props {
  earthquakeOrder: EarthquakeOrder;
  setEarthquakeOrder: React.Dispatch<React.SetStateAction<EarthquakeOrder>>;
  setAllOffensesToMax: (offenseTypeFilterList: Set<OffenseType>) => void;
  setAllOffensesToMin: (offenseTypeFilterList: Set<OffenseType>) => void;
}

export const EquipmentSetting = memo(function EquipmentSetting({
  earthquakeOrder,
  setEarthquakeOrder,
  setAllOffensesToMax,
  setAllOffensesToMin,
}: Props) {
  return (
    <SettingContainerWrapper>
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
    </SettingContainerWrapper>
  );
});
