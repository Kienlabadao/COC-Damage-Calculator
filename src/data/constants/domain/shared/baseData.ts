export type BaseLevelData = {
  readonly level: number;
  readonly isMaxLevel: boolean;
  readonly townHallLevel: number;
  readonly isAccessibleInEventOnly?: boolean;
};

export type LevelPairKey = `${number}:${number}`;

export type LevelByPairData<TLevel extends BaseLevelData = BaseLevelData> =
  Readonly<Record<LevelPairKey, TLevel>>;

export type BaseData<TLevel extends BaseLevelData = BaseLevelData> = {
  readonly levels: Readonly<Record<number, TLevel>>;
  readonly levelsOrdered: readonly TLevel[];
  readonly levelsByPair: LevelByPairData<TLevel>;

  readonly wikiUrl: string;
};
