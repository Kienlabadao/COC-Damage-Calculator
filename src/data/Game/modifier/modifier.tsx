import { ObjectValues } from "utils/objectUtils";
import { GAME_DATA_TYPE, GameDataType } from "../constants";
import { HERO, TROOP } from "../offense";

export const MODIFIER = {
  RageSpell: "rage_spell",
  RageGem: "rage_gem",
  BarbarianPuppet: "barbarian_puppet",
  RageVial: "rage_vial",
  RageSpellTower: "rage_spell_tower",
} as const;
export type Modifier = ObjectValues<typeof MODIFIER>;

interface LevelModify {
  level: number;
  modify: number;
}

export interface ModifierStats {
  name: string;
  affect_type: GameDataType[];
  affect_only: string[];
  doesnt_affect: string[];
  modify: LevelModify[];
}

export const ModifierData: Record<string, ModifierStats> = {
  rage_spell: {
    name: "Rage Spell",
    affect_type: [GAME_DATA_TYPE.Troop, GAME_DATA_TYPE.Hero],
    affect_only: [],
    doesnt_affect: [],
    modify: [
      { level: 1, modify: 130 },
      { level: 2, modify: 140 },
      { level: 3, modify: 150 },
      { level: 4, modify: 160 },
      { level: 5, modify: 170 },
      { level: 6, modify: 180 },
    ],
  },
  rage_gem: {
    name: "Rage Gem",
    affect_type: [GAME_DATA_TYPE.Troop, GAME_DATA_TYPE.Hero],
    affect_only: [],
    doesnt_affect: [HERO.GrandWarden],
    modify: [
      { level: 1, modify: 20 },
      { level: 2, modify: 20 },
      { level: 3, modify: 25 },
      { level: 4, modify: 25 },
      { level: 5, modify: 25 },
      { level: 6, modify: 30 },
      { level: 7, modify: 30 },
      { level: 8, modify: 30 },
      { level: 9, modify: 35 },
      { level: 10, modify: 35 },
      { level: 11, modify: 35 },
      { level: 12, modify: 40 },
      { level: 13, modify: 40 },
      { level: 14, modify: 40 },
      { level: 15, modify: 45 },
      { level: 16, modify: 45 },
      { level: 17, modify: 45 },
      { level: 18, modify: 50 },
    ],
  },
  barbarian_puppet: {
    name: "Barbarian Puppet",
    affect_type: [],
    affect_only: [TROOP.Barbarian],
    doesnt_affect: [],
    modify: [
      { level: 1, modify: 100 },
      { level: 2, modify: 100 },
      { level: 3, modify: 120 },
      { level: 4, modify: 120 },
      { level: 5, modify: 120 },
      { level: 6, modify: 140 },
      { level: 7, modify: 140 },
      { level: 8, modify: 140 },
      { level: 9, modify: 160 },
      { level: 10, modify: 160 },
      { level: 11, modify: 160 },
      { level: 12, modify: 180 },
      { level: 13, modify: 180 },
      { level: 14, modify: 180 },
      { level: 15, modify: 200 },
      { level: 16, modify: 200 },
      { level: 17, modify: 200 },
      { level: 18, modify: 220 },
    ],
  },
  rage_vial: {
    name: "Rage Vial",
    affect_type: [],
    affect_only: [HERO.BarbarianKing],
    doesnt_affect: [],
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
  rage_spell_tower: {
    name: "Rage Spell Tower",
    affect_type: [GAME_DATA_TYPE.Repair],
    affect_only: [],
    doesnt_affect: [],
    modify: [{ level: 1, modify: 60 }],
  },
};
