export const HERO_ID = {
  BarbarianKing: "barbarian-king",
  ArcherQueen: "archer-queen",
  MinionPrince: "minion-prince",
  GrandWarden: "grand-warden",
  RoyalChampion: "royal-champion",
  DragonDuke: "dragon-duke",
} as const;

export type HeroId = (typeof HERO_ID)[keyof typeof HERO_ID];
