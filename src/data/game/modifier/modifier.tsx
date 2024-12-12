import { GAME_DATA_TYPE, GameDataType } from "../constants";

interface LevelModify {
  level: number;
  modify: number;
}

export interface ModifierStats {
  name: string;
  affect_offense_type: GameDataType[];
  affect_only: string[];
  doesnt_affect: string[];
  modify: LevelModify[];
}

export const ModifierData: Record<string, ModifierStats> = {
  rage_spell: {
    name: "rage_spell",
    affect_offense_type: [GAME_DATA_TYPE.Troop, GAME_DATA_TYPE.Hero],
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
    name: "rage_gem",
    affect_offense_type: [GAME_DATA_TYPE.Troop, GAME_DATA_TYPE.Hero],
    affect_only: [],
    doesnt_affect: ["grand_warden"],
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
  rage_spell_tower: {
    name: "rage_spell_tower",
    affect_offense_type: [GAME_DATA_TYPE.Repair],
    affect_only: [],
    doesnt_affect: [],
    modify: [{ level: 1, modify: 60 }],
  },
};
