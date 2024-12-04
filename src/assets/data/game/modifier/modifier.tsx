import { GameDataType } from "../sharedEnums";

interface ModifierStats {
  name: string;
  affect_offense_type: GameDataType[];
  affect_only: string[];
  doesnt_affect: string[];
  modify: Record<number, number>;
}

export const ModifierData: Record<string, ModifierStats> = {
  rage_spell: {
    name: "rage_spell",
    affect_offense_type: [GameDataType.Troop, GameDataType.Hero],
    affect_only: [],
    doesnt_affect: [],
    modify: {
      1: 130,
      2: 140,
      3: 150,
      4: 160,
      5: 170,
      6: 180,
    },
  },
  rage_gem: {
    name: "rage_gem",
    affect_offense_type: [GameDataType.Troop, GameDataType.Hero],
    affect_only: [],
    doesnt_affect: ["grand_warden"],
    modify: {
      1: 20,
      2: 20,
      3: 25,
      4: 25,
      5: 25,
      6: 30,
      7: 30,
      8: 30,
      9: 35,
      10: 35,
      11: 35,
      12: 40,
      13: 40,
      14: 40,
      15: 45,
      16: 45,
      17: 45,
      18: 50,
    },
  },
  rage_spell_tower: {
    name: "rage_spell_tower",
    affect_offense_type: [GameDataType.Repair],
    affect_only: [],
    doesnt_affect: [],
    modify: {
      1: 60,
    },
  },
};
