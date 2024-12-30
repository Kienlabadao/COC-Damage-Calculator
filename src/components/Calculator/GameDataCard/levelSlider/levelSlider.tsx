import { Slider } from "components/UI";

interface Props {
  minLevelPos: number;
  maxLevelPos: number;
  currentLevelPos: number;
  updateCurrentLevelPos: (newCurrentLevelPos: number) => void;
  useTheme?: boolean;
}

export function LevelSlider({
  minLevelPos,
  maxLevelPos,
  currentLevelPos,
  updateCurrentLevelPos,
  useTheme = true,
}: Props) {
  return (
    <Slider
      min={minLevelPos}
      max={maxLevelPos}
      currentValue={currentLevelPos}
      onChange={(newValue: number) => updateCurrentLevelPos(newValue)}
      useTheme={useTheme}
    />
  );
}
