import { IMAGE_PATH } from "data/constants";
import { useGameDataImageDisplayerContext } from "../gameDataImageDisplayerContext";
import { convertToOverlaySize } from "../Helper";
import { Overlay, OVERLAY_TYPE, OverlayPosition } from "./overlay";

interface Props {
  position: OverlayPosition;
}

export function DeathDamageOverlay({ position }: Props) {
  const { size } = useGameDataImageDisplayerContext();

  const overlayType = OVERLAY_TYPE.ImgDeath;
  const overlaySize = convertToOverlaySize(size);
  const imgPath = IMAGE_PATH.DeathDamage;

  return (
    <Overlay
      type={overlayType}
      position={position}
      size={overlaySize}
      imgPath={imgPath}
    />
  );
}
