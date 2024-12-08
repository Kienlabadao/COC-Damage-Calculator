interface LevelRepair {
  level: number;
  repair: number;
}

export interface RepairStats {
  name: string;
  repair: LevelRepair[];
}

export const RepairData: Record<string, RepairStats> = {
  builders_hut: {
    name: "Builders Hut",
    repair: [
      { level: 2, repair: 32 },
      { level: 3, repair: 40 },
      { level: 4, repair: 48 },
      { level: 5, repair: 54 },
      { level: 6, repair: 60 },
    ],
  },
};
