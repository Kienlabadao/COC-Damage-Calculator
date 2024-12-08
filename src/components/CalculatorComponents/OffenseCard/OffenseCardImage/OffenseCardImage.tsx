interface Props {
  imagePath: string;
  level: number;
  isMaxed: boolean;
}

export function OffenseCardImage({ imagePath, level, isMaxed }: Props) {
  return (
    <>
      <img className="image object-container__img" src={imagePath} />
      <div
        className={`level overlay overlay--bottom-left overlay__number${
          isMaxed ? ` overlay__number--level-maxed` : ""
        }`}
      >
        {level}
      </div>
    </>
  );
}
