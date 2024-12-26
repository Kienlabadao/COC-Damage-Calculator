import { Overlay, OverlaySize, OverlayType, Position } from "../Overlay";

export interface Props {
  type: OverlayType;
  size: OverlaySize;
  position: Position;
  content?: string;
  imgPath?: string;
}

export function OverlayWrapper({
  type,
  size,
  position,
  content,
  imgPath,
}: Props) {
  return (
    <Overlay
      type={type}
      size={size}
      position={position}
      content={content}
      imgPath={imgPath}
    />
  );
}
