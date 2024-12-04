import { DamageType } from "./sharedEnums";

interface SpellStats {
  name: string;
  damage_type: DamageType;
  damage: Record<number, number>;
}

export const SpellData: Record<string, SpellStats> = {
  lightning_spell: {
    name: "Lightning Spell",
    damage_type: DamageType.Direct,
    damage: {
      1: 150,
      2: 180,
      3: 210,
      4: 240,
      5: 270,
      6: 320,
      7: 400,
      8: 480,
      9: 560,
      10: 600,
      11: 640,
    },
  },
  earthquake_spell: {
    name: "Earthquake Spell",
    damage_type: DamageType.Earthquake,
    damage: {
      1: 14.5,
      2: 17,
      3: 21,
      4: 25,
      5: 29,
    },
  },
};
