import { useGameDataImageDisplayerContext } from "../gameDataImageDisplayerContext";
import { convertToOverlaySize } from "../Helper/convertToOverlaySize";
import { Overlay, OVERLAY_TYPE, OverlayPosition } from "./overlay";

interface Props {
  position: OverlayPosition;
  order: number;
}

export function OrderOverlay({ position, order }: Props) {
  const { size } = useGameDataImageDisplayerContext();

  const overlayType = OVERLAY_TYPE.NumOrder;
  const overlaySize = convertToOverlaySize(size);
  const content = order.toString();

  return (
    <Overlay
      type={overlayType}
      position={position}
      size={overlaySize}
      content={content}
    />
  );
}
