import { SPELL } from "data/Game";
import { BACKGROUND_TYPE, BackgroundType } from "../gameDataImageDisplayer";

export function convertSpellID(spellID: string): BackgroundType {
  return spellID === SPELL.EarthquakeSpell
    ? BACKGROUND_TYPE.Earthquake
    : BACKGROUND_TYPE.Normal;
}
