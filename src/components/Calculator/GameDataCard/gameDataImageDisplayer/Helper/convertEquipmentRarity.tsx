import { Rarity, RARITY } from "data/Game";
import { BACKGROUND_TYPE, BackgroundType } from "../gameDataImageDisplayer";

export function convertEquipmentRarity(rarity: Rarity): BackgroundType {
  switch (rarity) {
    case RARITY.Epic:
      return BACKGROUND_TYPE.Epic;
    case RARITY.Common:
      return BACKGROUND_TYPE.Normal;
    default:
      throw new Error(
        `EquipmentCard.getBackgroundType ERROR: rarity (${rarity}) is not supported.`
      );
  }
}
