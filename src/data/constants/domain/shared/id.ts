export const ELIXIR_TROOP_ID = {
  Barbarian: "barbarian",
  Archer: "archer",
  Giant: "giant",
  Goblin: "goblin",
  WallBreaker: "wall-breaker",
  Balloon: "balloon",
  Wizard: "wizard",
  Dragon: "dragon",
  PEKKA: "pekka",
  BabyDragon: "baby-dragon",
  Miner: "miner",
  ElectroDragon: "electro-dragon",
  Yeti: "yeti",
  DragonRider: "dragon-rider",
  ElectroTitan: "electro-titan",
  RootRider: "root-rider",
  MeteorGolem: "meteor-golem",
} as const;

export type ElixirTroopId =
  (typeof ELIXIR_TROOP_ID)[keyof typeof ELIXIR_TROOP_ID];

export const DARK_ELIXIR_TROOP_ID = {
  Minion: "minion",
  HogRider: "hog-rider",
  Valkyrie: "valkyrie",
  Golem: "golem",
  Witch: "witch",
  LavaHound: "lava-hound",
  Bowler: "bowler",
  IceGolem: "ice-golem",
  Headhunter: "headhunter",
  ApprenticeWarden: "apprentice-warden",
};

export type DarkElixirTroopId =
  (typeof DARK_ELIXIR_TROOP_ID)[keyof typeof DARK_ELIXIR_TROOP_ID];

export const SUPER_TROOP_ID = {
  SuperBarbarian: "super-barbarian",
  SuperArcher: "super-archer",
  SuperGiant: "super-giant",
  SneakyGoblin: "sneaky-goblin",
  SuperWallBreaker: "super-wall-breaker",
  RocketBalloon: "rocket-balloon",
  SuperWizard: "super-wizard",
  SuperDragon: "super-dragon",
  InfernoDragon: "inferno-dragon",
  SuperMiner: "super-miner",
  SuperYeti: "super-yeti",
  SuperMinion: "super-minion",
  SuperHogRider: "super-hog-rider",
  SuperValkyrie: "super-valkyrie",
  SuperWitch: "super-witch",
  IceHound: "ice-hound",
  SuperBowler: "super-bowler",
} as const;
export type SuperTroopId = (typeof SUPER_TROOP_ID)[keyof typeof SUPER_TROOP_ID];

export const SUB_TROOP_ID = {
  Skeleton: "skeleton",
  Bat: "bat",
  Yetimite: "yetimite",
  Meteormite: "meteormite",
  Golemite: "golemite",
  LavaPup: "lava-pup",
  Bear: "bear",
  RuinKnight: "ruin-knight",
  ElectroMite: "electro-mite",
  SuperHog: "super-hog",
  SuperRider: "super-rider",
  BigBoy: "big-boy",
  IcePup: "ice-pup",
  Lavaloon: "lavaloon",
  LavaloonPup: "lavaloon-pup",
  GiantGiant: "giant-giant",
} as const;
export type SubTroopId = (typeof SUB_TROOP_ID)[keyof typeof SUB_TROOP_ID];

export const DIRECT_EQUIPMENT_ID = {
  EarthquakeBoots: "earthquake-boots",
  SpikyBall: "spiky-ball",
  GiantArrow: "giant-arrow",
  DarkOrb: "dark-orb",
  SeekingShield: "seeking-shield",
  FrostFlake: "frost-flake",
  FireHeart: "fire-heart",
  FlameBlower: "flame-blower",
  StunBlaster: "stun-blaster",
  ElectroFangs: "electro-fangs",
  RocketBackpack: "rocket-backpack",
} as const;

export type DirectEquipmentId =
  (typeof DIRECT_EQUIPMENT_ID)[keyof typeof DIRECT_EQUIPMENT_ID];
