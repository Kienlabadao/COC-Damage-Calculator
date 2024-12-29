import { Slider } from "components/UI";

interface Props {
  minLevelPos: number;
  maxLevelPos: number;
  currentLevelPos: number;
  updateCurrentLevelPos: (newCurrentLevelPos: number) => void;
}

export function LevelSlider({
  minLevelPos,
  maxLevelPos,
  currentLevelPos,
  updateCurrentLevelPos,
}: Props) {
  return (
    <Slider
      min={minLevelPos}
      max={maxLevelPos}
      currentValue={currentLevelPos}
      onChange={(newValue: number) => updateCurrentLevelPos(newValue)}
    />
  );
}
