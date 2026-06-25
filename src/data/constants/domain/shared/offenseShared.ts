import { type NestedValues } from "@/types/NestedValues";
import { type DefenseType, type OffenseType } from "../shared";
import {
  type BaseData,
  type BaseLevelData,
  type LevelByPairData,
} from "./baseData";
import { type DamageType } from "./offense/damageType";
import { type OffenseModifierType } from "./offense/offenseModifierType";

export const OFFENSE_ID = {
  Hero: {
    BarbarianKing: "barbarian-king",
    ArcherQueen: "archer-queen",
    MinionPrince: "minion-prince",
    GrandWarden: "grand-warden",
    RoyalChampion: "royal-champion",
    DragonDuke: "dragon-duke",
  },
  Troop: {
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
  },
  DarkElixirTroop: {
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
  },
  SuperTroop: {
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
  },
  SubTroop: {
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
  },
  DirectEquipment: {
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
  },
} as const;

export type OffenseId = NestedValues<typeof OFFENSE_ID>;

export const OFFENSE_TROOP_TYPE = {
  ElixirTroop: "elixir_troop",
  DarkElixirTroop: "dark_elixir_troop",
  SubTroop: "sub_troop",
  SuperTroop: "super_troop",
} as const;

export type OffenseTroopType =
  (typeof OFFENSE_TROOP_TYPE)[keyof typeof OFFENSE_TROOP_TYPE];

export type OffenseStageDamageData = {
  stage: number;

  damagePerHit: number;
};

export type OffenseLevelData = BaseLevelData & {
  damagePerHit?: number;

  earthquakeDamageToBuilding?: number;
  earthquakeDamageToUnit?: number;

  stageDamages?: OffenseStageDamageData[];

  auraDamagePerHit?: number;
  deathDamagePerHit?: number;
  wallDamagePerHit?: number;
  pointBlankDamagePerHit?: number;
};

export type OffenseModifierData = {
  modifierType: OffenseModifierType;
  preferenceDefenseType?: DefenseType;

  damagePerHitMultiplierInPercentage?: number;
  attackSpeedBetweenHitMultiplierInPercentage?: number;
};

export type OffenseData = {
  id: OffenseId;
  type: OffenseType;
  troopType?: OffenseTroopType;

  damageType: DamageType;
  attackSpeedBetweenHit: number;
  attackSpeedBetweenBurst?: number;
  auraDamageAttackSpeed?: number;
  separateWallDamageAttackSpeed?: number;

  levels: BaseData<OffenseLevelData>["levels"];
  levelsOrdered?: BaseData<OffenseLevelData>["levelsOrdered"];
  levelsByPair?: LevelByPairData<OffenseLevelData>;

  modifiers?: OffenseModifierData[];

  canDealDeathDamage: boolean;
  canDealAuraDamage: boolean;
  haveSeparateWallDamage: boolean;
  haveStageDamage: boolean;
  canDealPointBlankDamage: boolean;

  canDealChainDamage: boolean;
  maxChainTargets?: number;
  chainDamageMultiplierInPercentage?: number;

  canDealPoisonDamage: boolean;

  canOneShotWalls?: boolean;

  isTemporary: boolean;
  isTemporaryAvailable?: boolean;

  wikiUrl?: string;
};
