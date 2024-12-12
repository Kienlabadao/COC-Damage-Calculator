function getHPTextClass(isMaxed: boolean) {
  return isMaxed ? "text text--level-maxed" : "text";
}

interface Props {
  currentLevel: number;
  isMaxed: boolean;
}

export function LevelStatCell({ currentLevel, isMaxed }: Props) {
  return (
    <div className="card-custom card-custom__stat">
      <i className="fa-solid fa-chart-simple me-1" aria-hidden="true"></i>
      <span className={getHPTextClass(isMaxed)}>{currentLevel}</span>
    </div>
  );
}
