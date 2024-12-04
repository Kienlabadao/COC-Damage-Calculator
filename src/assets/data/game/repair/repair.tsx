interface RepairStats {
  name: string;
  repair: Record<number, number>;
}

interface Repair {
  [id: string]: RepairStats;
}

export const RepairData: Repair = {
  builders_hut: {
    name: "Builders Hut",
    repair: {
      2: 32,
      3: 40,
      4: 48,
      5: 54,
      6: 60,
    },
  },
};
