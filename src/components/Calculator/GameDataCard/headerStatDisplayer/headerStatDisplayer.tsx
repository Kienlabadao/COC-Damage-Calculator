import { ImageContainer } from "./imageContainer";
import { HPStatCell } from "./hpStatCell";
import { LevelStatCell } from "./levelStatCell";
import { SuperchargeLevelStatCell } from "./superchargeLevelStatCell";
import { memo } from "react";

interface Props {
  name: string;
  imagePath: string;
  currentLevel: number;
  superchargeLevel: number;
  isMaxed: boolean;
  currentHP: number;
  maxHP: number;
}

export const HeaderStatDisplayer = memo(function HeaderStatDisplayer({
  name,
  imagePath,
  currentLevel,
  superchargeLevel,
  isMaxed,
  currentHP,
  maxHP,
}: Props) {
  return (
    <div className="d-flex align-items-center">
      <div>
        <ImageContainer imagePath={imagePath} />
      </div>
      <div className="ms-3">
        <div className="h5">{name}</div>
        <div className="d-flex flex-wrap gap-2">
          <HPStatCell currentHP={currentHP} maxHP={maxHP} />

          <LevelStatCell currentLevel={currentLevel} isMaxed={isMaxed} />

          {superchargeLevel > 0 && (
            <SuperchargeLevelStatCell superchargeLevel={superchargeLevel} />
          )}
        </div>
      </div>
    </div>
  );
});
