import { useGameDataImageDisplayerContext } from "../gameDataImageDisplayerContext";
import { convertToOverlaySize } from "../Helper";
import { Overlay, OVERLAY_TYPE, OverlayPosition } from "./overlay";

interface Props {
  position: OverlayPosition;
  level: number;
  isMaxed: boolean;
}

export function LevelOverlay({ position, level, isMaxed }: Props) {
  const { size } = useGameDataImageDisplayerContext();

  const overlayType = isMaxed ? OVERLAY_TYPE.NumLevelMaxed : OVERLAY_TYPE.Num;
  const overlaySize = convertToOverlaySize(size);
  const content = level.toString();

  return (
    <Overlay
      type={overlayType}
      position={position}
      size={overlaySize}
      content={content}
    />
  );
}
