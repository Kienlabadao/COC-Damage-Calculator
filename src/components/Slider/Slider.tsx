function getSliderThemeClass(useTheme: boolean) {
  return useTheme ? " slider--theme" : "";
}

interface Props {
  min: number;
  max: number;
  currentValue: number;
  onInput: (newValue: number) => void;
  useTheme?: boolean;
  className?: string;
}

export function Slider({
  min,
  max,
  currentValue,
  onInput,
  useTheme = true,
  className = "",
}: Props) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onInput(event.target.valueAsNumber);
  }

  return (
    <input
      min={min}
      max={max}
      value={currentValue}
      type="range"
      className={`slider${getSliderThemeClass(useTheme)} ${className}`}
      onInput={handleChange}
    />
  );
}
