import { BS_COLOR, BSColor } from "data/constants";
import { clampNumber } from "utils/numberUtils";

interface Props {
  id: string;
  color?: BSColor;
  minValue: number;
  maxValue: number;
  currentValue: number;
  onChange: (value: number) => void;
}

export function NumberInputField({
  id,
  color = BS_COLOR.Gray,
  minValue,
  maxValue,
  currentValue,
  onChange,
}: Props) {
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.valueAsNumber;

    if (!isNaN(inputValue)) {
      onChange(clampNumber(inputValue, minValue, maxValue));
    } else {
      onChange(minValue);
    }
  }

  return (
    <input
      id={id}
      type="number"
      min={minValue}
      max={maxValue}
      value={currentValue}
      className={`form-control input-box${
        color !== BS_COLOR.None ? ` bg-${color}` : ""
      }`}
      onChange={handleInputChange}
    />
  );
}
