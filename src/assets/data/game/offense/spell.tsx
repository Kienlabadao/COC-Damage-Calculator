import { ObjectValues } from "utils/objectUtils";
import { DAMAGE_TYPE, DamageType } from "./sharedEnums";

export const SPELL = {
  LightningSpell: "lightning_spell",
  EarthquakeSpell: "earthquake_spell",
} as const;

export type Spell = ObjectValues<typeof SPELL>;

interface LevelDamage {
  level: number;
  damage: number;
}

export interface SpellStats {
  name: string;
  damage_type: DamageType;
  damage: LevelDamage[];
}

export const SpellData: Record<string, SpellStats> = {
  lightning_spell: {
    name: "Lightning Spell",
    damage_type: DAMAGE_TYPE.Direct,
    damage: [
      { level: 1, damage: 150 },
      { level: 2, damage: 180 },
      { level: 3, damage: 210 },
      { level: 4, damage: 240 },
      { level: 5, damage: 270 },
      { level: 6, damage: 320 },
      { level: 7, damage: 400 },
      { level: 8, damage: 480 },
      { level: 9, damage: 560 },
      { level: 10, damage: 600 },
      { level: 11, damage: 640 },
    ],
  },
  earthquake_spell: {
    name: "Earthquake Spell",
    damage_type: DAMAGE_TYPE.Earthquake,
    damage: [
      { level: 1, damage: 14.5 },
      { level: 2, damage: 17 },
      { level: 3, damage: 21 },
      { level: 4, damage: 25 },
      { level: 5, damage: 29 },
    ],
  },
};
