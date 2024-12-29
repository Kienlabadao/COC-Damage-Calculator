import { ObjectValues } from "utils/objectUtils";
import { GameDataImageDisplayerContext } from "./gameDataImageDisplayerContext";
import { ReactNode } from "react";

export const BACKGROUND_TYPE = {
  Normal: "normal",
  Epic: "epic",
  Earthquake: "earthquake",
  Immune: "immune",
  HardMode: "hardMode",
  Modifier: "modifier",
} as const;
export type BackgroundType = ObjectValues<typeof BACKGROUND_TYPE>;

export const SIZE = {
  Normal: "nomral",
  Small: "small",
  Large: "large",
  Responsive: "responsive",
  Tall: "tall",
} as const;
export type Size = ObjectValues<typeof SIZE>;

function renderBackgroundType(backgroudType: BackgroundType): string {
  switch (backgroudType) {
    case BACKGROUND_TYPE.Normal:
      return "";
    case BACKGROUND_TYPE.Earthquake:
      return " object-container--earthquake";
    case BACKGROUND_TYPE.Epic:
      return " object-container--epic";
    case BACKGROUND_TYPE.Immune:
      return " object-container--immune";
    case BACKGROUND_TYPE.HardMode:
      return " object-container--hardmode";
    case BACKGROUND_TYPE.Modifier:
      return " object-container--modifier";
    default:
      throw new Error(
        `GameDataCardContainer.renderBackgroundType ERROR: BackgroundType (${backgroudType}) is not supported.`
      );
  }
}

function renderContainerType(size: Size): string {
  switch (size) {
    case SIZE.Normal:
      return "";
    case SIZE.Small:
      return " object-container--small";
    case SIZE.Large:
      return " object-container--large";
    case SIZE.Responsive:
      return " object-container--responsive";
    case SIZE.Tall:
      return " object-container--tall";
    default:
      throw new Error(
        `GameDataCardContainer.renderContainerType ERROR: Type (${size}) is not supported.`
      );
  }
}

interface Props {
  imgPath: string;
  children: ReactNode;
  backgroundType?: BackgroundType;
  size?: Size;
}

export function GameDataImageDisplayer({
  imgPath,
  children,
  backgroundType = BACKGROUND_TYPE.Normal,
  size = SIZE.Normal,
}: Props) {
  return (
    <div
      className={`object-container${renderContainerType(
        size
      )}${renderBackgroundType(backgroundType)}`}
    >
      <GameDataImageDisplayerContext.Provider value={{ size }}>
        <img className="object-container__img" src={imgPath} />
        {children}
      </GameDataImageDisplayerContext.Provider>
    </div>
  );
}
