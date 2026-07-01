export const TARGET_TYPE = {
  Air: "air",
  Ground: "ground",
  Hero: "hero",
  Troop: "troop",
  Guardian: "guardian",
  Defense: "defense",
  Resource: "resource",
  Building: "building",
  Wall: "wall",
} as const;

export type TargetType = (typeof TARGET_TYPE)[keyof typeof TARGET_TYPE];

export const TARGET_TYPE_EXCLUSION_GROUP = {
  [TARGET_TYPE.Air]: [
    TARGET_TYPE.Ground,
    TARGET_TYPE.Guardian,
    TARGET_TYPE.Defense,
    TARGET_TYPE.Resource,
    TARGET_TYPE.Building,
    TARGET_TYPE.Wall,
  ],

  [TARGET_TYPE.Ground]: [TARGET_TYPE.Air],

  [TARGET_TYPE.Hero]: [
    TARGET_TYPE.Troop,
    TARGET_TYPE.Guardian,
    TARGET_TYPE.Defense,
    TARGET_TYPE.Resource,
    TARGET_TYPE.Building,
    TARGET_TYPE.Wall,
  ],

  [TARGET_TYPE.Troop]: [
    TARGET_TYPE.Hero,
    TARGET_TYPE.Guardian,
    TARGET_TYPE.Defense,
    TARGET_TYPE.Resource,
    TARGET_TYPE.Building,
    TARGET_TYPE.Wall,
  ],

  [TARGET_TYPE.Guardian]: [
    TARGET_TYPE.Hero,
    TARGET_TYPE.Troop,
    TARGET_TYPE.Defense,
    TARGET_TYPE.Resource,
    TARGET_TYPE.Building,
    TARGET_TYPE.Wall,
  ],

  [TARGET_TYPE.Defense]: [
    TARGET_TYPE.Air,
    TARGET_TYPE.Hero,
    TARGET_TYPE.Troop,
    TARGET_TYPE.Guardian,
    TARGET_TYPE.Resource,
    TARGET_TYPE.Wall,
  ],

  [TARGET_TYPE.Resource]: [
    TARGET_TYPE.Air,
    TARGET_TYPE.Hero,
    TARGET_TYPE.Troop,
    TARGET_TYPE.Guardian,
    TARGET_TYPE.Defense,
    TARGET_TYPE.Wall,
  ],

  [TARGET_TYPE.Building]: [
    TARGET_TYPE.Air,
    TARGET_TYPE.Hero,
    TARGET_TYPE.Troop,
    TARGET_TYPE.Guardian,
    TARGET_TYPE.Wall,
  ],

  [TARGET_TYPE.Wall]: [
    TARGET_TYPE.Air,
    TARGET_TYPE.Hero,
    TARGET_TYPE.Troop,
    TARGET_TYPE.Guardian,
    TARGET_TYPE.Defense,
    TARGET_TYPE.Resource,
    TARGET_TYPE.Building,
  ],
} as const;
