import { ObjectValues } from "utils/objectUtils";

export const BACKGROUND_TYPE = {
  Normal: "normal",
  Epic: "epic",
  Earthquake: "earthquake",
} as const;

export type BackgroundType = ObjectValues<typeof BACKGROUND_TYPE>;

interface Props {
  imagePath: string;
  level: number;
  isMaxed: boolean;
  backgroudType: BackgroundType;
}

export function OffenseCardImage({
  imagePath,
  level,
  isMaxed,
  backgroudType,
}: Props) {
  let containerClassName = "object-container";
  switch (backgroudType) {
    case BACKGROUND_TYPE.Earthquake:
      containerClassName += " object-container--earthquake";
      break;
    case BACKGROUND_TYPE.Epic:
      containerClassName += " object-container--epic";
      break;
  }

  return (
    <div className={containerClassName}>
      <img className="object-container__img" src={imagePath} />
      <div
        className={`overlay overlay--bottom-left overlay__number${
          isMaxed ? ` overlay__number--level-maxed` : ""
        }`}
      >
        {level}
      </div>
    </div>
  );
}
