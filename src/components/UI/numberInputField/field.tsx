import { BS_COLOR, BSColor } from "data/constants";
import { clampNumber } from "utils/numberUtils";
import { useNumberInputFieldContext } from "./numberInputFieldContext";

function convertBSColor(bsColor: BSColor): string {
  return bsColor !== BS_COLOR.None ? ` bg-${bsColor}` : "";
}

interface Props {
  minValue: number;
  maxValue: number;
  currentValue: number;
  onChange: (value: number) => void;
  color?: BSColor;
  className?: string;
}

export function Field({
  color = BS_COLOR.Gray,
  minValue,
  maxValue,
  currentValue,
  onChange,
  className = "",
}: Props) {
  const { id } = useNumberInputFieldContext();

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.valueAsNumber;

    if (!isNaN(inputValue)) {
      onChange(clampNumber(inputValue, minValue, maxValue));
    } else {
      onChange(minValue);
    }
  }

  const buttonColor = convertBSColor(color);

  return (
    <input
      id={id}
      type="number"
      min={minValue}
      max={maxValue}
      value={currentValue}
      className={`form-control input-box ${buttonColor} ${className}`}
      onChange={handleInputChange}
    />
  );
}
