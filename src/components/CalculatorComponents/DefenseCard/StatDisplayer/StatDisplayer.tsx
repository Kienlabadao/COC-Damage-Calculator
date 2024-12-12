import { ImageContainer } from "./ImageContainer";
import { HPStatCell } from "./HPStatCell";
import { LevelStatCell } from "./LevelStatCell";
import { SuperchargeLevelStatCell } from "./SuperchargeLevelStatCell";

interface Props {
  name: string;
  imagePath: string;
  currentLevel: number;
  superchargeLevel: number;
  isMaxed: boolean;
  currentHP: number;
  maxHP: number;
}

export function StatDisplayer({
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
}
