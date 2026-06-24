import {
  BarbarianKing,
  ArcherQueen,
  MinionPrince,
  GrandWarden,
  RoyalChampion,
  DragonDuke,
} from "./hero";
import { OFFENSE_ID, type OffenseData, type OffenseId } from "./offenseShared";

export const HeroData: Record<OffenseId, OffenseData> = {
  [OFFENSE_ID.Hero.BarbarianKing]: BarbarianKing,
  [OFFENSE_ID.Hero.ArcherQueen]: ArcherQueen,
  [OFFENSE_ID.Hero.MinionPrince]: MinionPrince,
  [OFFENSE_ID.Hero.GrandWarden]: GrandWarden,
  [OFFENSE_ID.Hero.RoyalChampion]: RoyalChampion,
  [OFFENSE_ID.Hero.DragonDuke]: DragonDuke,
};
