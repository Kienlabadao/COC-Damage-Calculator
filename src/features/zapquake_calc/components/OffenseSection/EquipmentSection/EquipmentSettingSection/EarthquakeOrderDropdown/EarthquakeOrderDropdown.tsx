import { Dropdown } from "components";
import { BS_COLOR } from "data/constants";
import { useOffenseSectionContext } from "features/zapquake_calc/context/OffenseSectionContext";
import { EARTHQUAKE_ORDER } from "features/zapquake_calc/data/constants";
import { isEarthquakeOrderType } from "features/zapquake_calc/utils/customObjectUtils";

interface Props {
  className?: string;
}

export function EarthquakeOrderDropdown({ className = "" }: Props) {
  const { earthquakeOrder, setEarthquakeOrder } = useOffenseSectionContext();

  const options = [
    {
      value: EARTHQUAKE_ORDER.EarthquakeSpell,
      label: "Earthquake Spell first",
    },
    {
      value: EARTHQUAKE_ORDER.EarthquakeBoots,
      label: "Earthquake Boots first",
    },
  ];

  const updateEarthquakeOrder = (value: string) => {
    if (isEarthquakeOrderType(value)) {
      setEarthquakeOrder(value);
    } else {
      throw new Error(
        `EarthquakeOrderDropdown.updateEarthquakeOrder ERROR: value (${value}) is not EarthquakeOrder type.`
      );
    }
  };

  return (
    <div className={className}>
      <Dropdown
        id="earthquake_order"
        label="Earthquake order:"
        color={BS_COLOR.Gray}
        options={options}
        selectedValue={earthquakeOrder}
        onChange={updateEarthquakeOrder}
      />
    </div>
  );
}
