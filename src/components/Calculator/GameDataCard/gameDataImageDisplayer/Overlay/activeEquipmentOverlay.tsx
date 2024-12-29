import { RARITY, Rarity } from "data/game";
import { useGameDataImageDisplayerContext } from "../gameDataImageDisplayerContext";
import { convertToOverlaySize } from "../Helper/convertToOverlaySize";
import { Overlay, OVERLAY_TYPE, OverlayPosition, OverlayType } from "./overlay";

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
