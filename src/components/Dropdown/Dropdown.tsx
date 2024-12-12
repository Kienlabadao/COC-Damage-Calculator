import { BS_COLOR, BSColor } from "data/constants";

function isOptionListContainSelectedValue(
  selectedValue: string,
  options: OptionProps[]
): boolean {
  return options.some((option) => option.value === selectedValue);
}

interface OptionProps {
  value: string;
  label: string;
}

interface Props {
  id: string;
  label: string;
  color: BSColor;
  options: OptionProps[];
  selectedValue: string;
  onChange: (value: string) => void;
}

export function Dropdown({
  id,
  label,
  color = BS_COLOR.Gray,
  options,
  selectedValue,
  onChange,
}: Props) {
  if (!isOptionListContainSelectedValue(selectedValue, options)) {
    throw new Error(
      `Dropdown ERROR: selectedValue (${selectedValue}) must match the value of at least 1 of the options.`
    );
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <>
      <label className="h5 mb-0" htmlFor={id}>
        {label}
      </label>
      <br />
      <select
        className={`form-select dropdown${
          color !== BS_COLOR.None ? ` bg-${color}` : ""
        }`}
        id={id}
        aria-label={id}
        value={selectedValue}
        onChange={handleChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
}
