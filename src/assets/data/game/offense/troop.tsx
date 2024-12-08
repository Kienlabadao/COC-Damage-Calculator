import { ObjectValues } from "utils/objectUtils";
import { DAMAGE_TYPE, DamageType } from "./sharedEnums";

export const TROOP_TYPE = {
  Normal: "normal",
  Super: "super",
} as const;

export type TroopType = ObjectValues<typeof TROOP_TYPE>;

interface LevelDamage {
  level: number;
  damage: number;
}

interface LevelDeathDamage {
  level: number;
  death_damage: number;
}

export interface TroopStats {
  name: string;
  damage_type: DamageType;
  troop_type: TroopType;
  damage: LevelDamage[];
  death_damage: LevelDeathDamage[];
}

export const TroopData: Record<string, TroopStats> = {
  balloon: {
    name: "Balloon",
    damage_type: DAMAGE_TYPE.Direct,
    troop_type: TROOP_TYPE.Normal,
    damage: [
      { level: 1, damage: 75 },
      { level: 2, damage: 96 },
      { level: 3, damage: 144 },
      { level: 4, damage: 216 },
      { level: 5, damage: 324 },
      { level: 6, damage: 486 },
      { level: 7, damage: 594 },
      { level: 8, damage: 708 },
      { level: 9, damage: 768 },
      { level: 10, damage: 828 },
      { level: 11, damage: 870 },
    ],
    death_damage: [
      { level: 1, death_damage: 25 },
      { level: 2, death_damage: 32 },
      { level: 3, death_damage: 48 },
      { level: 4, death_damage: 72 },
      { level: 5, death_damage: 108 },
      { level: 6, death_damage: 162 },
      { level: 7, death_damage: 214 },
      { level: 8, death_damage: 268 },
      { level: 9, death_damage: 322 },
      { level: 10, death_damage: 352 },
      { level: 11, death_damage: 375 },
    ],
  },
  rocket_balloon: {
    name: "Rocket Balloon",
    damage_type: DAMAGE_TYPE.Direct,
    troop_type: TROOP_TYPE.Super,
    damage: [
      { level: 8, damage: 810 },
      { level: 9, damage: 840 },
      { level: 10, damage: 855 },
      { level: 11, damage: 870 },
    ],
    death_damage: [
      { level: 8, death_damage: 580 },
      { level: 9, death_damage: 620 },
      { level: 10, death_damage: 650 },
      { level: 11, death_damage: 700 },
    ],
  },
};
