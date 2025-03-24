import { ObjectValues } from "utils/objectUtils";

export const REPAIR = {
  BuildersHut: "builders_hut",
} as const;
export type Repair = ObjectValues<typeof REPAIR>;

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
      { level: 2, repair: 37.5 },
      { level: 3, repair: 45 },
      { level: 4, repair: 52.5 },
      { level: 5, repair: 60 },
      { level: 6, repair: 63.75 },
      { level: 7, repair: 67.5 },
    ],
  },
};
