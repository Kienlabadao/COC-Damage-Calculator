import { ObjectValues } from "utils/objectUtils";

export const OVERLAY_TYPE = {
  Num: "num",
  NumSpellCount: "numSpellCount",
  NumLevelMaxed: "numLevelMaxed",
  NumOrder: "numOrder",
  Img: "img",
  ImgDeath: "imgDeath",
  ImgRaged: "imgRaged",
  ImgCommon: "imgCommon",
  ImgEpic: "imgEpic",
} as const;
export type OverlayType = ObjectValues<typeof OVERLAY_TYPE>;

export const OVERLAY_SIZE = {
  Normal: "nomral",
  Small: "small",
  Large: "large",
  Responsive: "responsive",
} as const;
export type OverlaySize = ObjectValues<typeof OVERLAY_SIZE>;

export const OVERLAY_POSITION = {
  Header: "header",
  TopRight: "topRight",
  TopLeft: "topLeft",
  BottomRight: "bottomRight",
  BottomLeft: "bottomLeft",
} as const;
export type OverlayPosition = ObjectValues<typeof OVERLAY_POSITION>;

function renderOverlayType(type: OverlayType): string {
  switch (type) {
    case OVERLAY_TYPE.Num:
      return " overlay__number";
    case OVERLAY_TYPE.NumSpellCount:
      return " overlay__number overlay__number--spell-count";
    case OVERLAY_TYPE.NumLevelMaxed:
      return " overlay__number overlay__number--level-maxed";
    case OVERLAY_TYPE.NumOrder:
      return " overlay__number overlay__number--order";
    case OVERLAY_TYPE.Img:
      return " overlay__img";
    case OVERLAY_TYPE.ImgDeath:
      return " overlay__img overlay__img--death";
    case OVERLAY_TYPE.ImgRaged:
      return " overlay__img overlay__img--raged";
    case OVERLAY_TYPE.ImgCommon:
      return " overlay__img overlay__img--common";
    case OVERLAY_TYPE.ImgEpic:
      return " overlay__img overlay__img--epic";
    default:
      throw new Error(
        `renderOverlayType ERROR: Type (${type}) is not supported.`
      );
  }
}

function renderContainerPosition(position: OverlayPosition): string {
  switch (position) {
    case OVERLAY_POSITION.Header:
      return "";
    case OVERLAY_POSITION.TopRight:
      return " overlay--top-right";
    case OVERLAY_POSITION.TopLeft:
      return " overlay--top-left";
    case OVERLAY_POSITION.BottomRight:
      return " overlay--bottom-right";
    case OVERLAY_POSITION.BottomLeft:
      return " overlay--bottom-left";
    default:
      throw new Error(
        `Overlay.renderContainerSize ERROR: Position (${position}) is not supported.`
      );
  }
}

function renderContainerSize(size: OverlaySize): string {
  switch (size) {
    case OVERLAY_SIZE.Normal:
      return "";
    case OVERLAY_SIZE.Small:
      return " overlay--small";
    case OVERLAY_SIZE.Large:
      return " overlay--large";
    case OVERLAY_SIZE.Responsive:
      return " overlay--responsive";
    default:
      throw new Error(
        `Overlay.renderContainerSize ERROR: Size (${size}) is not supported.`
      );
  }
}

interface Props {
  type: OverlayType;
  position: OverlayPosition;
  size: OverlaySize;
  content?: string;
  imgPath?: string;
}

export function Overlay({ type, position, size, content, imgPath }: Props) {
  return (
    <div
      className={`overlay${renderContainerSize(size)}${renderContainerPosition(
        position
      )}${renderOverlayType(type)}`}
    >
      {content ? content : ""}
      {imgPath && <img src={imgPath} />}
    </div>
  );
}
