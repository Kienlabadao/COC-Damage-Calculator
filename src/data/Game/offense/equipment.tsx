import { ObjectValues } from "utils/objectUtils";
import { Hero, HERO } from "./hero";
import { DAMAGE_TYPE, DamageType } from "./constants";

export const EQUIPMENT = {
  EarthquakeBoots: "earthquake_boots",
  SpikyBall: "spiky_ball",
  GiantArrow: "giant_arrow",
  Fireball: "fireball",
  SeekingShield: "seeking_shield",
  DarkOrb: "dark_orb",
  RageVial: "rage_vial",
  Vampstache: "vampstache",
  GiantGauntlet: "giant_gauntlet",
  ArcherPuppet: "archer_puppet",
  InvisibilityVial: "invisibility_vial",
  FrozenArrow: "frozen_arrow",
  HenchmenPuppet: "henchmen_puppet",
  LifeGem: "life_gem",
  RageGem: "rage_gem",
  LavaloonPuppet: "lavaloon_puppet",
  RoyalGem: "royal_gem",
  HasteVial: "haste_vial",
  RocketSpear: "rocket_spear",
} as const;
export type Equipment = ObjectValues<typeof EQUIPMENT>;

export const RARITY = {
  Common: "common",
  Epic: "epic",
} as const;
export type Rarity = ObjectValues<typeof RARITY>;

export const HARD_MODE_LEVEL_CAP = {
  Common: 15,
  Epic: 21,
} as const;
export type HardModeLevelCap = ObjectValues<typeof HARD_MODE_LEVEL_CAP>;

// Note: Damage and Attack type are mutually exclusive
export const EQUIPMENT_TYPE = {
  Support: "support", // Provide dps boost to hero
  Damage: "damage", // Damage isn't affected by external source (hero dps, mode, modifier, etc.)
  Attack: "attack", // Damage is affected by external source
} as const;

export type EquipmentType = ObjectValues<typeof EQUIPMENT_TYPE>;

interface LevelDamage {
  level: number;
  damage: number;
}

interface LevelDPSBoost {
  level: number;
  dps_boost: number;
}

interface LevelAttackSpeedBoost {
  level: number;
  atk_speed_boost: number;
}

interface LevelModify {
  level: number;
  modify: number;
}

interface AbilityBoost {
  atk_speed_boost: LevelAttackSpeedBoost[];
  modify: LevelModify[];
}

export interface EquipmentStats {
  name: string;
  user: Hero;
  rarity: Rarity;
  equipment_type: EquipmentType[];
  damage_type: DamageType | null;
  damage: LevelDamage[];
  dps_boost: LevelDPSBoost[];
  atk_speed_boost: LevelAttackSpeedBoost[];
  ability_boost: AbilityBoost | null;
}

// Note: This only include Equipment that either deal damage or provide dps boost for hero
export const EquipmentData: Record<string, EquipmentStats> = {
  rage_vial: {
    name: "Rage Vial",
    user: HERO.BarbarianKing,
    rarity: RARITY.Common,
    equipment_type: [EQUIPMENT_TYPE.Support],
    damage_type: null,
    damage: [],
    dps_boost: [
      { level: 1, dps_boost: 17 },
      { level: 2, dps_boost: 22 },
      { level: 3, dps_boost: 27 },
      { level: 4, dps_boost: 32 },
      { level: 5, dps_boost: 37 },
      { level: 6, dps_boost: 42 },
      { level: 7, dps_boost: 48 },
      { level: 8, dps_boost: 54 },
      { level: 9, dps_boost: 60 },
      { level: 10, dps_boost: 66 },
      { level: 11, dps_boost: 72 },
      { level: 12, dps_boost: 79 },
      { level: 13, dps_boost: 86 },
      { level: 14, dps_boost: 94 },
      { level: 15, dps_boost: 104 },
      { level: 16, dps_boost: 112 },
      { level: 17, dps_boost: 120 },
      { level: 18, dps_boost: 128 },
    ],
    atk_speed_boost: [],
    ability_boost: {
      atk_speed_boost: [],
      modify: [
        { level: 1, modify: 120 },
        { level: 2, modify: 120 },
        { level: 3, modify: 130 },
        { level: 4, modify: 130 },
        { level: 5, modify: 130 },
        { level: 6, modify: 135 },
        { level: 7, modify: 135 },
        { level: 8, modify: 135 },
        { level: 9, modify: 140 },
        { level: 10, modify: 140 },
        { level: 11, modify: 140 },
        { level: 12, modify: 145 },
        { level: 13, modify: 145 },
        { level: 14, modify: 145 },
        { level: 15, modify: 150 },
        { level: 16, modify: 150 },
        { level: 17, modify: 150 },
        { level: 18, modify: 155 },
      ],
    },
  },
  earthquake_boots: {
    name: "Earthquake Boots",
    user: HERO.BarbarianKing,
    rarity: RARITY.Common,
    equipment_type: [EQUIPMENT_TYPE.Support, EQUIPMENT_TYPE.Damage],
    damage_type: DAMAGE_TYPE.Earthquake,
    damage: [
      { level: 1, damage: 10 },
      { level: 2, damage: 10 },
      { level: 3, damage: 20 },
      { level: 4, damage: 20 },
      { level: 5, damage: 20 },
      { level: 6, damage: 30 },
      { level: 7, damage: 30 },
      { level: 8, damage: 30 },
      { level: 9, damage: 34 },
      { level: 10, damage: 34 },
      { level: 11, damage: 34 },
      { level: 12, damage: 36 },
      { level: 13, damage: 36 },
      { level: 14, damage: 36 },
      { level: 15, damage: 38 },
      { level: 16, damage: 38 },
      { level: 17, damage: 38 },
      { level: 18, damage: 40 },
    ],
    dps_boost: [
      { level: 1, dps_boost: 13 },
      { level: 2, dps_boost: 15 },
      { level: 3, dps_boost: 17 },
      { level: 4, dps_boost: 19 },
      { level: 5, dps_boost: 21 },
      { level: 6, dps_boost: 23 },
      { level: 7, dps_boost: 26 },
      { level: 8, dps_boost: 28 },
      { level: 9, dps_boost: 32 },
      { level: 10, dps_boost: 40 },
      { level: 11, dps_boost: 48 },
      { level: 12, dps_boost: 55 },
      { level: 13, dps_boost: 63 },
      { level: 14, dps_boost: 71 },
      { level: 15, dps_boost: 79 },
      { level: 16, dps_boost: 86 },
      { level: 17, dps_boost: 94 },
      { level: 18, dps_boost: 102 },
    ],
    atk_speed_boost: [],
    ability_boost: null,
  },
  vampstache: {
    name: "Vampstache",
    user: HERO.BarbarianKing,
    rarity: RARITY.Common,
    equipment_type: [EQUIPMENT_TYPE.Support],
    damage_type: null,
    damage: [],
    dps_boost: [
      { level: 1, dps_boost: 10 },
      { level: 2, dps_boost: 15 },
      { level: 3, dps_boost: 20 },
      { level: 4, dps_boost: 25 },
      { level: 5, dps_boost: 30 },
      { level: 6, dps_boost: 40 },
      { level: 7, dps_boost: 45 },
      { level: 8, dps_boost: 50 },
      { level: 9, dps_boost: 60 },
      { level: 10, dps_boost: 65 },
      { level: 11, dps_boost: 70 },
      { level: 12, dps_boost: 80 },
      { level: 13, dps_boost: 85 },
      { level: 14, dps_boost: 90 },
      { level: 15, dps_boost: 100 },
      { level: 16, dps_boost: 105 },
      { level: 17, dps_boost: 110 },
      { level: 18, dps_boost: 120 },
    ],
    atk_speed_boost: [
      { level: 1, atk_speed_boost: 5 },
      { level: 2, atk_speed_boost: 6 },
      { level: 3, atk_speed_boost: 7 },
      { level: 4, atk_speed_boost: 8 },
      { level: 5, atk_speed_boost: 9 },
      { level: 6, atk_speed_boost: 10 },
      { level: 7, atk_speed_boost: 11 },
      { level: 8, atk_speed_boost: 12 },
      { level: 9, atk_speed_boost: 13 },
      { level: 10, atk_speed_boost: 14 },
      { level: 11, atk_speed_boost: 15 },
      { level: 12, atk_speed_boost: 16 },
      { level: 13, atk_speed_boost: 17 },
      { level: 14, atk_speed_boost: 18 },
      { level: 15, atk_speed_boost: 19 },
      { level: 16, atk_speed_boost: 20 },
      { level: 17, atk_speed_boost: 21 },
      { level: 18, atk_speed_boost: 22 },
    ],
    ability_boost: null,
  },
  giant_gauntlet: {
    name: "Giant Gauntlet",
    user: HERO.BarbarianKing,
    rarity: RARITY.Epic,
    equipment_type: [EQUIPMENT_TYPE.Support],
    damage_type: null,
    damage: [],
    dps_boost: [
      { level: 1, dps_boost: 17 },
      { level: 2, dps_boost: 20 },
      { level: 3, dps_boost: 23 },
      { level: 4, dps_boost: 26 },
      { level: 5, dps_boost: 29 },
      { level: 6, dps_boost: 32 },
      { level: 7, dps_boost: 34 },
      { level: 8, dps_boost: 37 },
      { level: 9, dps_boost: 43 },
      { level: 10, dps_boost: 53 },
      { level: 11, dps_boost: 63 },
      { level: 12, dps_boost: 74 },
      { level: 13, dps_boost: 84 },
      { level: 14, dps_boost: 94 },
      { level: 15, dps_boost: 104 },
      { level: 16, dps_boost: 115 },
      { level: 17, dps_boost: 125 },
      { level: 18, dps_boost: 135 },
      { level: 19, dps_boost: 137 },
      { level: 20, dps_boost: 140 },
      { level: 21, dps_boost: 142 },
      { level: 22, dps_boost: 145 },
      { level: 23, dps_boost: 147 },
      { level: 24, dps_boost: 150 },
      { level: 25, dps_boost: 152 },
      { level: 26, dps_boost: 155 },
      { level: 27, dps_boost: 160 },
    ],
    atk_speed_boost: [],
    ability_boost: null,
  },
  spiky_ball: {
    name: "Spiky Ball",
    user: HERO.BarbarianKing,
    rarity: RARITY.Epic,
    equipment_type: [EQUIPMENT_TYPE.Support, EQUIPMENT_TYPE.Damage],
    damage_type: DAMAGE_TYPE.Direct,
    damage: [
      { level: 1, damage: 1000 },
      { level: 2, damage: 1000 },
      { level: 3, damage: 1250 },
      { level: 4, damage: 1250 },
      { level: 5, damage: 1250 },
      { level: 6, damage: 1500 },
      { level: 7, damage: 1500 },
      { level: 8, damage: 1500 },
      { level: 9, damage: 1750 },
      { level: 10, damage: 1750 },
      { level: 11, damage: 1750 },
      { level: 12, damage: 2000 },
      { level: 13, damage: 2000 },
      { level: 14, damage: 2000 },
      { level: 15, damage: 2250 },
      { level: 16, damage: 2250 },
      { level: 17, damage: 2250 },
      { level: 18, damage: 2500 },
      { level: 19, damage: 2500 },
      { level: 20, damage: 2500 },
      { level: 21, damage: 2750 },
      { level: 22, damage: 2750 },
      { level: 23, damage: 2750 },
      { level: 24, damage: 3000 },
      { level: 25, damage: 3000 },
      { level: 26, damage: 3000 },
      { level: 27, damage: 3250 },
    ],
    dps_boost: [
      { level: 1, dps_boost: 35 },
      { level: 2, dps_boost: 38 },
      { level: 3, dps_boost: 42 },
      { level: 4, dps_boost: 45 },
      { level: 5, dps_boost: 49 },
      { level: 6, dps_boost: 52 },
      { level: 7, dps_boost: 55 },
      { level: 8, dps_boost: 58 },
      { level: 9, dps_boost: 65 },
      { level: 10, dps_boost: 76 },
      { level: 11, dps_boost: 88 },
      { level: 12, dps_boost: 101 },
      { level: 13, dps_boost: 112 },
      { level: 14, dps_boost: 124 },
      { level: 15, dps_boost: 135 },
      { level: 16, dps_boost: 148 },
      { level: 17, dps_boost: 159 },
      { level: 18, dps_boost: 171 },
      { level: 19, dps_boost: 176 },
      { level: 20, dps_boost: 182 },
      { level: 21, dps_boost: 188 },
      { level: 22, dps_boost: 194 },
      { level: 23, dps_boost: 199 },
      { level: 24, dps_boost: 205 },
      { level: 25, dps_boost: 211 },
      { level: 26, dps_boost: 217 },
      { level: 27, dps_boost: 222 },
    ],
    atk_speed_boost: [],
    ability_boost: null,
  },
  archer_puppet: {
    name: "Archer Puppet",
    user: HERO.ArcherQueen,
    rarity: RARITY.Common,
    equipment_type: [EQUIPMENT_TYPE.Support],
    damage_type: null,
    damage: [],
    dps_boost: [
      { level: 1, dps_boost: 28 },
      { level: 2, dps_boost: 37 },
      { level: 3, dps_boost: 46 },
      { level: 4, dps_boost: 54 },
      { level: 5, dps_boost: 61 },
      { level: 6, dps_boost: 68 },
      { level: 7, dps_boost: 78 },
      { level: 8, dps_boost: 88 },
      { level: 9, dps_boost: 99 },
      { level: 10, dps_boost: 110 },
      { level: 11, dps_boost: 120 },
      { level: 12, dps_boost: 127 },
      { level: 13, dps_boost: 134 },
      { level: 14, dps_boost: 140 },
      { level: 15, dps_boost: 145 },
      { level: 16, dps_boost: 150 },
      { level: 17, dps_boost: 154 },
      { level: 18, dps_boost: 159 },
    ],
    atk_speed_boost: [],
    ability_boost: null,
  },
  invisibility_vial: {
    name: "Invisibility Vial",
    user: HERO.ArcherQueen,
    rarity: RARITY.Common,
    equipment_type: [EQUIPMENT_TYPE.Attack],
    damage_type: DAMAGE_TYPE.Direct,
    damage: [
      { level: 1, damage: 340 },
      { level: 2, damage: 440 },
      { level: 3, damage: 540 },
      { level: 4, damage: 640 },
      { level: 5, damage: 730 },
      { level: 6, damage: 820 },
      { level: 7, damage: 920 },
      { level: 8, damage: 1020 },
      { level: 9, damage: 1120 },
      { level: 10, damage: 1220 },
      { level: 11, damage: 1310 },
      { level: 12, damage: 1370 },
      { level: 13, damage: 1430 },
      { level: 14, damage: 1490 },
      { level: 15, damage: 1560 },
      { level: 16, damage: 1620 },
      { level: 17, damage: 1680 },
      { level: 18, damage: 1740 },
    ],
    dps_boost: [],
    atk_speed_boost: [],
    ability_boost: null,
  },
  giant_arrow: {
    name: "Giant Arrow",
    user: HERO.ArcherQueen,
    rarity: RARITY.Common,
    equipment_type: [EQUIPMENT_TYPE.Support, EQUIPMENT_TYPE.Damage],
    damage_type: DAMAGE_TYPE.Direct,
    damage: [
      { level: 1, damage: 750 },
      { level: 2, damage: 750 },
      { level: 3, damage: 850 },
      { level: 4, damage: 850 },
      { level: 5, damage: 850 },
      { level: 6, damage: 1000 },
      { level: 7, damage: 1000 },
      { level: 8, damage: 1000 },
      { level: 9, damage: 1200 },
      { level: 10, damage: 1200 },
      { level: 11, damage: 1200 },
      { level: 12, damage: 1500 },
      { level: 13, damage: 1500 },
      { level: 14, damage: 1500 },
      { level: 15, damage: 1750 },
      { level: 16, damage: 1750 },
      { level: 17, damage: 1750 },
      { level: 18, damage: 1950 },
    ],
    dps_boost: [
      { level: 1, dps_boost: 20 },
      { level: 2, dps_boost: 23 },
      { level: 3, dps_boost: 27 },
      { level: 4, dps_boost: 30 },
      { level: 5, dps_boost: 33 },
      { level: 6, dps_boost: 37 },
      { level: 7, dps_boost: 40 },
      { level: 8, dps_boost: 43 },
      { level: 9, dps_boost: 50 },
      { level: 10, dps_boost: 59 },
      { level: 11, dps_boost: 68 },
      { level: 12, dps_boost: 77 },
      { level: 13, dps_boost: 86 },
      { level: 14, dps_boost: 96 },
      { level: 15, dps_boost: 105 },
      { level: 16, dps_boost: 114 },
      { level: 17, dps_boost: 123 },
      { level: 18, dps_boost: 132 },
    ],
    atk_speed_boost: [],
    ability_boost: null,
  },
  frozen_arrow: {
    name: "Frozen Arrow",
    user: HERO.ArcherQueen,
    rarity: RARITY.Epic,
    equipment_type: [EQUIPMENT_TYPE.Support],
    damage_type: null,
    damage: [],
    dps_boost: [
      { level: 1, dps_boost: 35 },
      { level: 2, dps_boost: 40 },
      { level: 3, dps_boost: 45 },
      { level: 4, dps_boost: 50 },
      { level: 5, dps_boost: 55 },
      { level: 6, dps_boost: 60 },
      { level: 7, dps_boost: 66 },
      { level: 8, dps_boost: 72 },
      { level: 9, dps_boost: 78 },
      { level: 10, dps_boost: 85 },
      { level: 11, dps_boost: 92 },
      { level: 12, dps_boost: 99 },
      { level: 13, dps_boost: 105 },
      { level: 14, dps_boost: 111 },
      { level: 15, dps_boost: 117 },
      { level: 16, dps_boost: 122 },
      { level: 17, dps_boost: 127 },
      { level: 18, dps_boost: 132 },
      { level: 19, dps_boost: 136 },
      { level: 20, dps_boost: 140 },
      { level: 21, dps_boost: 144 },
      { level: 22, dps_boost: 148 },
      { level: 23, dps_boost: 152 },
      { level: 24, dps_boost: 156 },
      { level: 25, dps_boost: 160 },
      { level: 26, dps_boost: 164 },
      { level: 27, dps_boost: 168 },
    ],
    atk_speed_boost: [],
    ability_boost: null,
  },
  life_gem: {
    name: "Life Gem",
    user: HERO.GrandWarden,
    rarity: RARITY.Common,
    equipment_type: [EQUIPMENT_TYPE.Support],
    damage_type: null,
    damage: [],
    dps_boost: [
      { level: 1, dps_boost: 11 },
      { level: 2, dps_boost: 13 },
      { level: 3, dps_boost: 16 },
      { level: 4, dps_boost: 18 },
      { level: 5, dps_boost: 20 },
      { level: 6, dps_boost: 22 },
      { level: 7, dps_boost: 24 },
      { level: 8, dps_boost: 26 },
      { level: 9, dps_boost: 31 },
      { level: 10, dps_boost: 35 },
      { level: 11, dps_boost: 42 },
      { level: 12, dps_boost: 46 },
      { level: 13, dps_boost: 51 },
      { level: 14, dps_boost: 55 },
      { level: 15, dps_boost: 59 },
      { level: 16, dps_boost: 64 },
      { level: 17, dps_boost: 68 },
      { level: 18, dps_boost: 73 },
    ],
    atk_speed_boost: [],
    ability_boost: null,
  },
  rage_gem: {
    name: "Rage Gem",
    user: HERO.GrandWarden,
    rarity: RARITY.Common,
    equipment_type: [EQUIPMENT_TYPE.Support],
    damage_type: null,
    damage: [],
    dps_boost: [
      { level: 1, dps_boost: 12 },
      { level: 2, dps_boost: 14 },
      { level: 3, dps_boost: 16 },
      { level: 4, dps_boost: 18 },
      { level: 5, dps_boost: 20 },
      { level: 6, dps_boost: 22 },
      { level: 7, dps_boost: 24 },
      { level: 8, dps_boost: 26 },
      { level: 9, dps_boost: 30 },
      { level: 10, dps_boost: 36 },
      { level: 11, dps_boost: 43 },
      { level: 12, dps_boost: 49 },
      { level: 13, dps_boost: 56 },
      { level: 14, dps_boost: 62 },
      { level: 15, dps_boost: 69 },
      { level: 16, dps_boost: 75 },
      { level: 17, dps_boost: 82 },
      { level: 18, dps_boost: 88 },
    ],
    atk_speed_boost: [
      { level: 1, atk_speed_boost: 5 },
      { level: 2, atk_speed_boost: 6 },
      { level: 3, atk_speed_boost: 7 },
      { level: 4, atk_speed_boost: 8 },
      { level: 5, atk_speed_boost: 9 },
      { level: 6, atk_speed_boost: 10 },
      { level: 7, atk_speed_boost: 11 },
      { level: 8, atk_speed_boost: 12 },
      { level: 9, atk_speed_boost: 13 },
      { level: 10, atk_speed_boost: 14 },
      { level: 11, atk_speed_boost: 15 },
      { level: 12, atk_speed_boost: 16 },
      { level: 13, atk_speed_boost: 17 },
      { level: 14, atk_speed_boost: 18 },
      { level: 15, atk_speed_boost: 19 },
      { level: 16, atk_speed_boost: 20 },
      { level: 17, atk_speed_boost: 21 },
      { level: 18, atk_speed_boost: 22 },
    ],
    ability_boost: null,
  },
  fireball: {
    name: "Fireball",
    user: HERO.GrandWarden,
    rarity: RARITY.Epic,
    equipment_type: [EQUIPMENT_TYPE.Support, EQUIPMENT_TYPE.Damage],
    damage_type: DAMAGE_TYPE.Direct,
    damage: [
      { level: 1, damage: 1500 },
      { level: 2, damage: 1500 },
      { level: 3, damage: 1700 },
      { level: 4, damage: 1700 },
      { level: 5, damage: 1800 },
      { level: 6, damage: 1950 },
      { level: 7, damage: 1950 },
      { level: 8, damage: 2050 },
      { level: 9, damage: 2200 },
      { level: 10, damage: 2200 },
      { level: 11, damage: 2350 },
      { level: 12, damage: 2650 },
      { level: 13, damage: 2650 },
      { level: 14, damage: 2750 },
      { level: 15, damage: 3100 },
      { level: 16, damage: 3100 },
      { level: 17, damage: 3250 },
      { level: 18, damage: 3400 },
      { level: 19, damage: 3400 },
      { level: 20, damage: 3500 },
      { level: 21, damage: 3650 },
      { level: 22, damage: 3650 },
      { level: 23, damage: 3750 },
      { level: 24, damage: 3900 },
      { level: 25, damage: 3900 },
      { level: 26, damage: 3950 },
      { level: 27, damage: 4100 },
    ],
    dps_boost: [
      { level: 1, dps_boost: 21 },
      { level: 2, dps_boost: 24 },
      { level: 3, dps_boost: 27 },
      { level: 4, dps_boost: 30 },
      { level: 5, dps_boost: 33 },
      { level: 6, dps_boost: 36 },
      { level: 7, dps_boost: 40 },
      { level: 8, dps_boost: 44 },
      { level: 9, dps_boost: 47 },
      { level: 10, dps_boost: 51 },
      { level: 11, dps_boost: 56 },
      { level: 12, dps_boost: 60 },
      { level: 13, dps_boost: 63 },
      { level: 14, dps_boost: 67 },
      { level: 15, dps_boost: 71 },
      { level: 16, dps_boost: 74 },
      { level: 17, dps_boost: 77 },
      { level: 18, dps_boost: 80 },
      { level: 19, dps_boost: 82 },
      { level: 20, dps_boost: 84 },
      { level: 21, dps_boost: 87 },
      { level: 22, dps_boost: 89 },
      { level: 23, dps_boost: 92 },
      { level: 24, dps_boost: 94 },
      { level: 25, dps_boost: 96 },
      { level: 26, dps_boost: 99 },
      { level: 27, dps_boost: 101 },
    ],
    atk_speed_boost: [],
    ability_boost: null,
  },
  lavaloon_puppet: {
    name: "Lavaloon Puppet",
    user: HERO.GrandWarden,
    rarity: RARITY.Epic,
    equipment_type: [EQUIPMENT_TYPE.Support],
    damage_type: null,
    damage: [],
    dps_boost: [
      { level: 1, dps_boost: 10 },
      { level: 2, dps_boost: 12 },
      { level: 3, dps_boost: 13 },
      { level: 4, dps_boost: 15 },
      { level: 5, dps_boost: 16 },
      { level: 6, dps_boost: 18 },
      { level: 7, dps_boost: 20 },
      { level: 8, dps_boost: 22 },
      { level: 9, dps_boost: 23 },
      { level: 10, dps_boost: 25 },
      { level: 11, dps_boost: 28 },
      { level: 12, dps_boost: 30 },
      { level: 13, dps_boost: 31 },
      { level: 14, dps_boost: 33 },
      { level: 15, dps_boost: 35 },
      { level: 16, dps_boost: 37 },
      { level: 17, dps_boost: 38 },
      { level: 18, dps_boost: 40 },
      { level: 19, dps_boost: 41 },
      { level: 20, dps_boost: 42 },
      { level: 21, dps_boost: 43 },
      { level: 22, dps_boost: 45 },
      { level: 23, dps_boost: 46 },
      { level: 24, dps_boost: 47 },
      { level: 25, dps_boost: 48 },
      { level: 26, dps_boost: 49 },
      { level: 27, dps_boost: 50 },
    ],
    atk_speed_boost: [],
    ability_boost: null,
  },
  royal_gem: {
    name: "Royal Gem",
    user: HERO.RoyalChampion,
    rarity: RARITY.Common,
    equipment_type: [EQUIPMENT_TYPE.Support],
    damage_type: null,
    damage: [],
    dps_boost: [
      { level: 1, dps_boost: 35 },
      { level: 2, dps_boost: 40 },
      { level: 3, dps_boost: 45 },
      { level: 4, dps_boost: 50 },
      { level: 5, dps_boost: 55 },
      { level: 6, dps_boost: 60 },
      { level: 7, dps_boost: 65 },
      { level: 8, dps_boost: 70 },
      { level: 9, dps_boost: 75 },
      { level: 10, dps_boost: 80 },
      { level: 11, dps_boost: 85 },
      { level: 12, dps_boost: 90 },
      { level: 13, dps_boost: 95 },
      { level: 14, dps_boost: 100 },
      { level: 15, dps_boost: 105 },
      { level: 16, dps_boost: 110 },
      { level: 17, dps_boost: 115 },
      { level: 18, dps_boost: 120 },
    ],
    atk_speed_boost: [],
    ability_boost: null,
  },
  seeking_shield: {
    name: "Seeking Shield",
    user: HERO.RoyalChampion,
    rarity: RARITY.Common,
    equipment_type: [EQUIPMENT_TYPE.Damage],
    damage_type: DAMAGE_TYPE.Direct,
    damage: [
      { level: 1, damage: 1000 },
      { level: 2, damage: 1000 },
      { level: 3, damage: 1250 },
      { level: 4, damage: 1250 },
      { level: 5, damage: 1250 },
      { level: 6, damage: 1500 },
      { level: 7, damage: 1500 },
      { level: 8, damage: 1500 },
      { level: 9, damage: 1750 },
      { level: 10, damage: 1750 },
      { level: 11, damage: 1750 },
      { level: 12, damage: 2000 },
      { level: 13, damage: 2000 },
      { level: 14, damage: 2000 },
      { level: 15, damage: 2250 },
      { level: 16, damage: 2250 },
      { level: 17, damage: 2250 },
      { level: 18, damage: 2500 },
    ],
    dps_boost: [],
    atk_speed_boost: [],
    ability_boost: null,
  },
  haste_vial: {
    name: "Haste Vial",
    user: HERO.RoyalChampion,
    rarity: RARITY.Common,
    equipment_type: [EQUIPMENT_TYPE.Support],
    damage_type: null,
    damage: [],
    dps_boost: [
      { level: 1, dps_boost: 20 },
      { level: 2, dps_boost: 24 },
      { level: 3, dps_boost: 28 },
      { level: 4, dps_boost: 32 },
      { level: 5, dps_boost: 36 },
      { level: 6, dps_boost: 40 },
      { level: 7, dps_boost: 44 },
      { level: 8, dps_boost: 48 },
      { level: 9, dps_boost: 52 },
      { level: 10, dps_boost: 56 },
      { level: 11, dps_boost: 60 },
      { level: 12, dps_boost: 64 },
      { level: 13, dps_boost: 68 },
      { level: 14, dps_boost: 72 },
      { level: 15, dps_boost: 76 },
      { level: 16, dps_boost: 80 },
      { level: 17, dps_boost: 84 },
      { level: 18, dps_boost: 88 },
    ],
    atk_speed_boost: [
      { level: 1, atk_speed_boost: 5 },
      { level: 2, atk_speed_boost: 6 },
      { level: 3, atk_speed_boost: 6 },
      { level: 4, atk_speed_boost: 7 },
      { level: 5, atk_speed_boost: 8 },
      { level: 6, atk_speed_boost: 8 },
      { level: 7, atk_speed_boost: 9 },
      { level: 8, atk_speed_boost: 10 },
      { level: 9, atk_speed_boost: 10 },
      { level: 10, atk_speed_boost: 11 },
      { level: 11, atk_speed_boost: 12 },
      { level: 12, atk_speed_boost: 12 },
      { level: 13, atk_speed_boost: 13 },
      { level: 14, atk_speed_boost: 14 },
      { level: 15, atk_speed_boost: 14 },
      { level: 16, atk_speed_boost: 15 },
      { level: 17, atk_speed_boost: 16 },
      { level: 18, atk_speed_boost: 16 },
    ],
    ability_boost: {
      atk_speed_boost: [
        { level: 1, atk_speed_boost: 60 },
        { level: 2, atk_speed_boost: 60 },
        { level: 3, atk_speed_boost: 60 },
        { level: 4, atk_speed_boost: 60 },
        { level: 5, atk_speed_boost: 60 },
        { level: 6, atk_speed_boost: 80 },
        { level: 7, atk_speed_boost: 80 },
        { level: 8, atk_speed_boost: 80 },
        { level: 9, atk_speed_boost: 80 },
        { level: 10, atk_speed_boost: 80 },
        { level: 11, atk_speed_boost: 80 },
        { level: 12, atk_speed_boost: 80 },
        { level: 13, atk_speed_boost: 80 },
        { level: 14, atk_speed_boost: 80 },
        { level: 15, atk_speed_boost: 100 },
        { level: 16, atk_speed_boost: 100 },
        { level: 17, atk_speed_boost: 100 },
        { level: 18, atk_speed_boost: 100 },
      ],
      modify: [],
    },
  },
  rocket_spear: {
    name: "Rocket Spear",
    user: HERO.RoyalChampion,
    rarity: RARITY.Epic,
    equipment_type: [EQUIPMENT_TYPE.Support, EQUIPMENT_TYPE.Attack],
    damage_type: DAMAGE_TYPE.Direct,
    damage: [
      { level: 1, damage: 350 },
      { level: 2, damage: 350 },
      { level: 3, damage: 420 },
      { level: 4, damage: 420 },
      { level: 5, damage: 420 },
      { level: 6, damage: 490 },
      { level: 7, damage: 490 },
      { level: 8, damage: 490 },
      { level: 9, damage: 560 },
      { level: 10, damage: 560 },
      { level: 11, damage: 560 },
      { level: 12, damage: 630 },
      { level: 13, damage: 630 },
      { level: 14, damage: 630 },
      { level: 15, damage: 700 },
      { level: 16, damage: 700 },
      { level: 17, damage: 700 },
      { level: 18, damage: 770 },
      { level: 19, damage: 770 },
      { level: 20, damage: 770 },
      { level: 21, damage: 840 },
      { level: 22, damage: 840 },
      { level: 23, damage: 840 },
      { level: 24, damage: 910 },
      { level: 25, damage: 910 },
      { level: 26, damage: 910 },
      { level: 27, damage: 980 },
    ],
    dps_boost: [
      { level: 1, dps_boost: 35 },
      { level: 2, dps_boost: 40 },
      { level: 3, dps_boost: 45 },
      { level: 4, dps_boost: 50 },
      { level: 5, dps_boost: 55 },
      { level: 6, dps_boost: 60 },
      { level: 7, dps_boost: 66 },
      { level: 8, dps_boost: 72 },
      { level: 9, dps_boost: 78 },
      { level: 10, dps_boost: 85 },
      { level: 11, dps_boost: 92 },
      { level: 12, dps_boost: 99 },
      { level: 13, dps_boost: 105 },
      { level: 14, dps_boost: 111 },
      { level: 15, dps_boost: 117 },
      { level: 16, dps_boost: 122 },
      { level: 17, dps_boost: 127 },
      { level: 18, dps_boost: 132 },
      { level: 19, dps_boost: 136 },
      { level: 20, dps_boost: 140 },
      { level: 21, dps_boost: 144 },
      { level: 22, dps_boost: 148 },
      { level: 23, dps_boost: 152 },
      { level: 24, dps_boost: 156 },
      { level: 25, dps_boost: 160 },
      { level: 26, dps_boost: 164 },
      { level: 27, dps_boost: 168 },
    ],
    atk_speed_boost: [],
    ability_boost: null,
  },
  henchmen_puppet: {
    name: "Henchmen Puppet",
    user: HERO.MinionPrince,
    rarity: RARITY.Common,
    equipment_type: [EQUIPMENT_TYPE.Support],
    damage_type: null,
    damage: [],
    dps_boost: [
      { level: 1, dps_boost: 33 },
      { level: 2, dps_boost: 38 },
      { level: 3, dps_boost: 46 },
      { level: 4, dps_boost: 51 },
      { level: 5, dps_boost: 56 },
      { level: 6, dps_boost: 64 },
      { level: 7, dps_boost: 71 },
      { level: 8, dps_boost: 78 },
      { level: 9, dps_boost: 92 },
      { level: 10, dps_boost: 103 },
      { level: 11, dps_boost: 114 },
      { level: 12, dps_boost: 131 },
      { level: 13, dps_boost: 140 },
      { level: 14, dps_boost: 149 },
      { level: 15, dps_boost: 162 },
      { level: 16, dps_boost: 169 },
      { level: 17, dps_boost: 176 },
      { level: 18, dps_boost: 188 },
    ],
    atk_speed_boost: [],
    ability_boost: null,
  },
  dark_orb: {
    name: "Dark Orb",
    user: HERO.MinionPrince,
    rarity: RARITY.Common,
    equipment_type: [EQUIPMENT_TYPE.Support, EQUIPMENT_TYPE.Damage],
    damage_type: DAMAGE_TYPE.Direct,
    damage: [
      { level: 1, damage: 45 },
      { level: 2, damage: 45 },
      { level: 3, damage: 55 },
      { level: 4, damage: 55 },
      { level: 5, damage: 55 },
      { level: 6, damage: 65 },
      { level: 7, damage: 65 },
      { level: 8, damage: 65 },
      { level: 9, damage: 75 },
      { level: 10, damage: 75 },
      { level: 11, damage: 75 },
      { level: 12, damage: 100 },
      { level: 13, damage: 100 },
      { level: 14, damage: 100 },
      { level: 15, damage: 150 },
      { level: 16, damage: 150 },
      { level: 17, damage: 150 },
      { level: 18, damage: 200 },
    ],
    dps_boost: [
      { level: 1, dps_boost: 10 },
      { level: 2, dps_boost: 13 },
      { level: 3, dps_boost: 18 },
      { level: 4, dps_boost: 21 },
      { level: 5, dps_boost: 24 },
      { level: 6, dps_boost: 29 },
      { level: 7, dps_boost: 32 },
      { level: 8, dps_boost: 35 },
      { level: 9, dps_boost: 40 },
      { level: 10, dps_boost: 43 },
      { level: 11, dps_boost: 46 },
      { level: 12, dps_boost: 51 },
      { level: 13, dps_boost: 54 },
      { level: 14, dps_boost: 57 },
      { level: 15, dps_boost: 62 },
      { level: 16, dps_boost: 65 },
      { level: 17, dps_boost: 68 },
      { level: 18, dps_boost: 73 },
    ],
    atk_speed_boost: [],
    ability_boost: null,
  },
};
