import {
  DefenseCardWrapper,
  HeaderStatDisplayer,
  LevelSlider,
} from "components/Calculator";

interface Props {
  name: string;
  imagePath: string;
  minLevelPos: number;
  maxLevelPos: number;
  currentLevelPos: number;
  currentLevel: number;
  superchargeLevel: number;
  isMaxed: boolean;
  updateCurrentLevelPos: (newCurrentLevelPos: number) => void;
  maxHP: number;
  remainingHP: number;
}

export function DefenseCard({
  name,
  imagePath,
  minLevelPos,
  maxLevelPos,
  currentLevelPos,
  currentLevel,
  superchargeLevel,
  isMaxed,
  updateCurrentLevelPos,
  maxHP,
  remainingHP,
}: Props) {
  return (
    <DefenseCardWrapper>
      <HeaderStatDisplayer
        name={name}
        imagePath={imagePath}
        currentLevel={currentLevel}
        superchargeLevel={superchargeLevel}
        isMaxed={isMaxed}
        currentHP={remainingHP}
        maxHP={maxHP}
      />
      <div className="mt-3">
        <LevelSlider
          minLevelPos={minLevelPos}
          maxLevelPos={maxLevelPos}
          currentLevelPos={currentLevelPos}
          updateCurrentLevelPos={updateCurrentLevelPos}
          useTheme={false}
        />
      </div>
      <div className="mt-3"></div>
    </DefenseCardWrapper>
  );
}
