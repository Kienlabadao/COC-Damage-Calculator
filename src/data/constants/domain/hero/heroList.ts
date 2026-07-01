import { HERO_ID, type HeroId } from "./shared/id";
import { type HeroData } from "./shared/heroData";
import { BarbarianKing } from "./barbarianKing";
import { ArcherQueen } from "./archerQueen";
import { MinionPrince } from "./minionPrince";
import { GrandWarden } from "./grandWarden";
import { RoyalChampion } from "./royalChampion";
import { DragonDuke } from "./dragonDuke";

export const HeroList: Record<HeroId, HeroData> = {
  [HERO_ID.BarbarianKing]: BarbarianKing,
  [HERO_ID.ArcherQueen]: ArcherQueen,
  [HERO_ID.MinionPrince]: MinionPrince,
  [HERO_ID.GrandWarden]: GrandWarden,
  [HERO_ID.RoyalChampion]: RoyalChampion,
  [HERO_ID.DragonDuke]: DragonDuke,
};
