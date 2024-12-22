import { ObjectValues } from "utils/objectUtils";
import { OFFENSE_TYPE } from "./offense";

export const GAME_DATA_TYPE = {
  ...OFFENSE_TYPE,
  Modifier: "modifier",
  Defense: "defense",
  Repair: "repair",
} as const;
export type GameDataType = ObjectValues<typeof GAME_DATA_TYPE>;
