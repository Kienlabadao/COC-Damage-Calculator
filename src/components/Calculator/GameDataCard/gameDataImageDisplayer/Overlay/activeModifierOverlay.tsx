import { useGameDataImageDisplayerContext } from "../gameDataImageDisplayerContext";
import { convertToOverlaySize } from "../Helper/convertToOverlaySize";
import { Overlay, OVERLAY_TYPE, OverlayPosition } from "./overlay";

interface Props {
  position: OverlayPosition;
  modifierImgPath: string;
}

export function ActiveModifierOverlay({ position, modifierImgPath }: Props) {
  const { size } = useGameDataImageDisplayerContext();

  const overlayType = OVERLAY_TYPE.ImgRaged;
  const overlaySize = convertToOverlaySize(size);
  const imgPath = modifierImgPath;

  return (
    <Overlay
      type={overlayType}
      position={position}
      size={overlaySize}
      imgPath={imgPath}
    />
  );
}
