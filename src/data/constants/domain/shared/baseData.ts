export type BaseLevelData = {
  level: number;
  isMaxLevel: boolean;
  townHallLevel: number;
  isAccessibleInEventOnly?: boolean;
};

export type LevelPairKey = `${number}:${number}`;

export type LevelByPairData<TLevel extends BaseLevelData = BaseLevelData> =
  Record<LevelPairKey, TLevel>;

export type BaseData<TLevel extends BaseLevelData = BaseLevelData> = {
  levels: Record<number, TLevel>;
  levelsOrdered: TLevel[];
  levelsByPair: LevelByPairData<TLevel>;

  wikiUrl: string;
};
