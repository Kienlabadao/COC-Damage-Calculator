import { TEXT_TYPE, TextFormatter } from "components/UI";

interface Props {
  currentLevel: number;
  isMaxed: boolean;
}

export function LevelStatCell({ currentLevel, isMaxed }: Props) {
  const content = `${currentLevel}`;
  const textType = isMaxed ? TEXT_TYPE.LevelMaxed : TEXT_TYPE.Normal;

  return (
    <div className="card-custom card-custom__stat">
      <i className="fa-solid fa-chart-simple me-1" aria-hidden="true"></i>
      <TextFormatter content={content} textType={textType} />
    </div>
  );
}
