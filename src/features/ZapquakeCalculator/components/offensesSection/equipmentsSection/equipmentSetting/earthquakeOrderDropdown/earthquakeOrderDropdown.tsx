import { Dropdown } from "components/UI";
import { BS_COLOR } from "data/constants";
import {
  EARTHQUAKE_ORDER,
  EarthquakeOrder,
} from "features/ZapquakeCalculator/data/constants";
import { isEarthquakeOrderType } from "features/ZapquakeCalculator/utils/customObjectUtils";

interface Props {
  earthquakeOrder: EarthquakeOrder;
  setEarthquakeOrder: React.Dispatch<React.SetStateAction<EarthquakeOrder>>;
  className?: string;
}

export function EarthquakeOrderDropdown({
  earthquakeOrder,
  setEarthquakeOrder,
  className = "",
}: Props) {
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
