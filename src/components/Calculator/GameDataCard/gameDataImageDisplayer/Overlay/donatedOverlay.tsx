import { IMAGE_PATH } from "data/constants";
import { useGameDataImageDisplayerContext } from "../gameDataImageDisplayerContext";
import { convertToOverlaySize } from "../Helper";
import { Overlay, OVERLAY_TYPE, OverlayPosition } from "./overlay";

interface Props {
  position: OverlayPosition;
}

export function DonatedOverlay({ position }: Props) {
  const { size } = useGameDataImageDisplayerContext();

  const overlayType = OVERLAY_TYPE.Img;
  const overlaySize = convertToOverlaySize(size);
  const imgPath = IMAGE_PATH.Donated;

  return (
    <Overlay
      type={overlayType}
      position={position}
      size={overlaySize}
      imgPath={imgPath}
    />
  );
}
