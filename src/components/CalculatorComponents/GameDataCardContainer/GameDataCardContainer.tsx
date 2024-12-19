import { ObjectValues } from "utils/objectUtils";
import {
  Overlay,
  OVERLAY_TYPE,
  POSITION,
  OverlaySize,
  OVERLAY_SIZE,
} from "./Overlay";
import { IMAGE_PATH } from "data/constants";

export const BACKGROUND_TYPE = {
  Normal: "normal",
  Epic: "epic",
  Earthquake: "earthquake",
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
    default:
      throw new Error(
        `GameDataCardContainer.renderBackgroundType ERROR: BackgroundType (${backgroudType}) is not supported.`
      );
  }
}

function convertCardSize(size: Size): OverlaySize {
  switch (size) {
    case SIZE.Normal:
      return OVERLAY_SIZE.Normal;
    case SIZE.Small:
      return OVERLAY_SIZE.Small;
    case SIZE.Large:
      return OVERLAY_SIZE.Large;
    case SIZE.Responsive:
      return OVERLAY_SIZE.Responsive;
    case SIZE.Tall:
      return OVERLAY_SIZE.Small;
    default:
      throw new Error(
        `GameDataCardContainer.convertCardType ERROR: Type (${size}) is not supported.`
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
  backgroundType?: BackgroundType;
  size?: Size;
  level?: number;
  count?: number;
  isMaxed?: boolean;
  isDonated?: boolean;
}

export function GameDataCardContainer({
  imgPath,
  backgroundType = BACKGROUND_TYPE.Normal,
  size = SIZE.Normal,
  level,
  count,
  isMaxed = false,
  isDonated = false,
}: Props) {
  return (
    <div
      className={`object-container${renderContainerType(
        size
      )}${renderBackgroundType(backgroundType)}`}
    >
      {size === SIZE.Tall && (
        <div className="object-container__header">
          <Overlay
            type={OVERLAY_TYPE.NumSpellCount}
            position={POSITION.None}
            content={count ? `x${count}` : ""}
          />
        </div>
      )}
      {isDonated && (
        <Overlay
          type={OVERLAY_TYPE.Img}
          position={POSITION.TopLeft}
          size={convertCardSize(size)}
          imgPath={IMAGE_PATH.Donated}
        />
      )}
      {level && (
        <Overlay
          type={isMaxed ? OVERLAY_TYPE.NumLevelMaxed : OVERLAY_TYPE.Num}
          position={POSITION.BottomLeft}
          size={convertCardSize(size)}
          content={`${level}`}
        />
      )}
      <img className="object-container__img" src={imgPath} />
    </div>
  );
}
