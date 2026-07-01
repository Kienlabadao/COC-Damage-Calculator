import {
  type BaseLevelData,
  type LevelByPairData,
  type LevelPairKey,
} from "./baseData";

export function createLevelPairKey(level: BaseLevelData): LevelPairKey {
  return `${level.townHallLevel}:${level.level}`;
}

export function compareLevelOrder(a: BaseLevelData, b: BaseLevelData): number {
  if (a.level !== b.level) {
    return a.level - b.level;
  }

  return a.townHallLevel - b.townHallLevel;
}

export function normalizeLevelsFromEntries<TLevel extends BaseLevelData>(
  entries: ReadonlyArray<readonly [number, TLevel]>,
) {
  const levels: Record<number, TLevel> = {};
  const levelsByPair: Record<LevelPairKey, TLevel> = {};
  const seenPairToKey = new Map<LevelPairKey, number>();

  for (const [recordKey, row] of entries) {
    if (recordKey in levels) {
      throw new Error("Duplicate levels record key: " + recordKey);
    }

    const pairKey = createLevelPairKey(row);
    const existingKey = seenPairToKey.get(pairKey);

    if (existingKey !== undefined) {
      throw new Error(
        "Duplicate (townHallLevel, level) pair " +
          pairKey +
          ". Existing key=" +
          existingKey +
          ", duplicate key=" +
          recordKey,
      );
    }

    seenPairToKey.set(pairKey, recordKey);
    levelsByPair[pairKey] = row;
    levels[recordKey] = row;
  }

  return {
    levels: levels as Readonly<Record<number, TLevel>>,
    levelsOrdered: [...Object.values(levels)].sort(
      compareLevelOrder,
    ) as readonly TLevel[],
    levelsByPair: levelsByPair as LevelByPairData<TLevel>,
  };
}

export function normalizeLevelsFromRecord<TLevel extends BaseLevelData>(
  levels: Readonly<Record<number, TLevel>>,
) {
  return normalizeLevelsFromEntries(
    Object.entries(levels).map(([recordKey, row]) => [Number(recordKey), row]),
  );
}

export function normalizeLevelData<TRawLevel, TLevel extends BaseLevelData>(
  rawLevels: Readonly<Record<number, TRawLevel>>,
  normalizeFn: (rawLevel: TRawLevel) => TLevel,
) {
  const levelData: Record<number, TLevel> = {};

  for (const [recordKey, rawLevel] of Object.entries(rawLevels)) {
    const numericKey = Number(recordKey);
    levelData[numericKey] = normalizeFn(rawLevel);
  }

  return normalizeLevelsFromRecord(levelData);
}
