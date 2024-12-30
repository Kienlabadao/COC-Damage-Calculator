import { RARITY, Rarity } from "data/Game";
import { useGameDataImageDisplayerContext } from "../gameDataImageDisplayerContext";
import { Overlay, OVERLAY_TYPE, OverlayPosition, OverlayType } from "./overlay";
import { convertToOverlaySize } from "../Helper";

function getOverlayType(rarity: Rarity): OverlayType {
  switch (rarity) {
    case RARITY.Common:
      return OVERLAY_TYPE.ImgCommon;
    case RARITY.Epic:
      return OVERLAY_TYPE.ImgEpic;
    default:
      throw new Error(
        `ActiveEquipmentOverlay.getOverlayType ERROR: rarity (${rarity}) is not supported.`
      );
  }
}

interface Props {
  position: OverlayPosition;
  equipmentImgPath: string;
  rarity: Rarity;
}

export function ActiveEquipmentOverlay({
  position,
  equipmentImgPath,
  rarity,
}: Props) {
  const { size } = useGameDataImageDisplayerContext();

  const overlayType = getOverlayType(rarity);
  const overlaySize = convertToOverlaySize(size);
  const imgPath = equipmentImgPath;

  return (
    <Overlay
      type={overlayType}
      position={position}
      size={overlaySize}
      imgPath={imgPath}
    />
  );
}
