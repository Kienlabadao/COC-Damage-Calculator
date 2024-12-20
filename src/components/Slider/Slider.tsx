function getSliderThemeClass(useTheme: boolean) {
  return useTheme ? " slider--theme" : "";
}

interface Props {
  min: number;
  max: number;
  currentValue: number;
  onChange: (newValue: number) => void;
  useTheme?: boolean;
  className?: string;
}

export function Slider({
  min,
  max,
  currentValue,
  onChange,
  useTheme = true,
  className = "",
}: Props) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.valueAsNumber);
  }

  return (
    <input
      min={min}
      max={max}
      value={currentValue}
      type="range"
      className={`slider${getSliderThemeClass(useTheme)} ${className}`}
      onChange={handleChange}
    />
  );
}
