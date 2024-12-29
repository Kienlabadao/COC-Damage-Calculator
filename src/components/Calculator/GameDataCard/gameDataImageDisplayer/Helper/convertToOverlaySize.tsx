import { SIZE, Size } from "../gameDataImageDisplayer";
import { OVERLAY_SIZE, OverlaySize } from "../Overlay";

export function convertToOverlaySize(size: Size): OverlaySize {
  switch (size) {
    case SIZE.Normal:
      return OVERLAY_SIZE.Normal;
    case SIZE.Small:
      return OVERLAY_SIZE.Small;
    case SIZE.Large:
      return OVERLAY_SIZE.Large;
    case SIZE.Responsive:
      return OVERLAY_SIZE.Responsive;
    case SIZE.Tall:
      return OVERLAY_SIZE.Small;
    default:
      throw new Error(
        `convertToOverlaySize ERROR: Type (${size}) is not supported.`
      );
  }
}
