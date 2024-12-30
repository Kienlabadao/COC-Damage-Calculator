import { useGameDataImageDisplayerContext } from "../gameDataImageDisplayerContext";
import { convertToOverlaySize } from "../Helper";
import { Overlay, OVERLAY_TYPE, OverlayPosition } from "./overlay";

interface Props {
  position: OverlayPosition;
  spellCount: number;
}

export function SpellCountOverlay({ position, spellCount }: Props) {
  const { size } = useGameDataImageDisplayerContext();

  const overlayType = OVERLAY_TYPE.NumSpellCount;
  const overlaySize = convertToOverlaySize(size);
  const content = `x${spellCount}`;

  return (
    <Overlay
      type={overlayType}
      position={position}
      size={overlaySize}
      content={content}
    />
  );
}
