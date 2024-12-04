import { OffenseType } from "./offense";

export const enum GameDataType {
  Modifier = "modifier",
  Defense = "defense",
  Repair = "repair",
  Equipment = OffenseType.Equipment,
  Hero = OffenseType.Hero,
  Spell = OffenseType.Spell,
  Troop = OffenseType.Troop,
}
