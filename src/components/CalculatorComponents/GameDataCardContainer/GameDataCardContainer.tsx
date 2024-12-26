import { ObjectValues } from "utils/objectUtils";
import { POSITION, OverlayType, OVERLAY_SIZE, OverlaySize } from "./Overlay";
import { HeaderOverlayWrapper } from "./HeaderOverlayWrapper";
import { OverlayWrapper } from "./OverlayWrapper";

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

export interface HeaderOverlayProps {
  type: OverlayType;
  content: string;
}

export interface OverlayProps {
  type: OverlayType;
  content?: string;
  imgPath?: string;
}

interface Props {
  imgPath: string;
  backgroundType?: BackgroundType;
  size?: Size;
  headerOverlay?: HeaderOverlayProps;
  topLeftOverlay?: OverlayProps;
  topRightOverlay?: OverlayProps;
  bottomLeftOverlay?: OverlayProps;
  bottomRightOverlay?: OverlayProps;
}

export function GameDataCardContainer({
  imgPath,
  backgroundType = BACKGROUND_TYPE.Normal,
  size = SIZE.Normal,
  headerOverlay,
  topLeftOverlay,
  topRightOverlay,
  bottomLeftOverlay,
  bottomRightOverlay,
}: Props) {
  const overlaySize: OverlaySize = ((size: Size): OverlaySize => {
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
  })(size);

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

  return (
    <div
      className={`object-container${renderContainerType(
        size
      )}${renderBackgroundType(backgroundType)}`}
    >
      {size === SIZE.Tall && headerOverlay && (
        <HeaderOverlayWrapper
          type={headerOverlay.type}
          content={headerOverlay.content}
        />
      )}
      {topLeftOverlay && (
        <OverlayWrapper
          type={topLeftOverlay.type}
          size={overlaySize}
          position={POSITION.TopLeft}
          content={topLeftOverlay.content}
          imgPath={topLeftOverlay.imgPath}
        />
      )}
      {topRightOverlay && (
        <OverlayWrapper
          type={topRightOverlay.type}
          size={overlaySize}
          position={POSITION.TopRight}
          content={topRightOverlay.content}
          imgPath={topRightOverlay.imgPath}
        />
      )}
      {bottomLeftOverlay && (
        <OverlayWrapper
          type={bottomLeftOverlay.type}
          size={overlaySize}
          position={POSITION.BottomLeft}
          content={bottomLeftOverlay.content}
          imgPath={bottomLeftOverlay.imgPath}
        />
      )}
      {bottomRightOverlay && (
        <OverlayWrapper
          type={bottomRightOverlay.type}
          size={overlaySize}
          position={POSITION.BottomRight}
          content={bottomRightOverlay.content}
          imgPath={bottomRightOverlay.imgPath}
        />
      )}
      <img className="object-container__img" src={imgPath} />
    </div>
  );
}
