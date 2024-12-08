interface Props {
  min: number;
  max: number;
  currentValue: number;
  onInput: (newValue: number) => void;
}

export function Slider({ min, max, currentValue, onInput }: Props) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.valueAsNumber);
    onInput(event.target.valueAsNumber);
  }

  return (
    <input
      min={min}
      max={max}
      value={currentValue}
      type="range"
      className="slider slider--theme"
      onInput={handleChange}
    />
  );
}
