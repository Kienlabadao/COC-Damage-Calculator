import { Button } from "components";
import { BS_COLOR } from "data/constants";
import { OFFENSE_TYPE } from "data/game";
import { useOffenseSectionContext } from "features/zapquake_calc/context/OffenseSectionContext";
import { EarthquakeOrderDropdown } from "./EarthquakeOrderDropdown";

interface Props {
  className?: string;
}

export function EquipmentSettingSection({ className = "" }: Props) {
  const { setAllOffensesToMax, setAllOffensesToMin } =
    useOffenseSectionContext();

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

      <EarthquakeOrderDropdown className="d-flex align-items-center flex-wrap gap-1" />
    </div>
  );
}
