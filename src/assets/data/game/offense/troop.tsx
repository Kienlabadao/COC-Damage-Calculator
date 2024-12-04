import { DamageType } from "./sharedEnums";

export const enum TroopType {
  Normal = "normal",
  Super = "super",
}

interface TroopStats {
  name: string;
  damage_type: DamageType;
  troop_type: TroopType;
  damage: Record<number, number>;
  death_damage: Record<number, number>;
}

export const troops: Record<string, TroopStats> = {
  balloon: {
    name: "Balloon",
    damage_type: DamageType.Direct,
    troop_type: TroopType.Normal,
    damage: {
      1: 75,
      2: 96,
      3: 144,
      4: 216,
      5: 324,
      6: 486,
      7: 594,
      8: 708,
      9: 768,
      10: 828,
      11: 870,
    },
    death_damage: {
      1: 25,
      2: 32,
      3: 48,
      4: 72,
      5: 108,
      6: 162,
      7: 214,
      8: 268,
      9: 322,
      10: 352,
      11: 375,
    },
  },
  rocket_balloon: {
    name: "Rocket Balloon",
    damage_type: DamageType.Direct,
    troop_type: TroopType.Super,
    damage: {
      8: 810,
      9: 840,
      10: 855,
      11: 870,
    },
    death_damage: {
      8: 580,
      9: 620,
      10: 650,
      11: 700,
    },
  },
};
