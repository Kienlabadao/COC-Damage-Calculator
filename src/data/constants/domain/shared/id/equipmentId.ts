import { type NestedValues } from "@/types/NestedValues";

export const EQUIPMENT_ID = {
  BarbarianKing: {
    RageVial: "rage_vial",
    EarthquakeBoots: "earthquake_boots",
    Vampstache: "vampstache",
    GiantGauntlet: "giant_gauntlet",
    SpikyBall: "spiky_ball",
    SnakeBracelet: "snake_bracelet",
    StickHorse: "stick_horse",
  },
  ArcherQueen: {
    InvisibilityVial: "invisibility_vial",
    GiantArrow: "giant_arrow",
    FrozenArrow: "frozen_arrow",
    ActionFigure: "action_figure",
    MonolithArrow: "monolith_arrow",
  },
  MinionPrince: {
    HenchmanPuppet: "henchman_puppet",
    DarkOrb: "dark_orb",
    NobleIron: "noble_iron",
    DarkCrown: "dark_crown",
    MeteorStaff: "meteor_staff",
  },
  GrandWarden: {
    LifeGem: "life_gem",
    RageGem: "rage_gem",
    Fireball: "fireball",
    LavaloonPuppet: "lavaloon_puppet",
    HeroicTorch: "heroic_torch",
  },
  RoyalChampion: {
    RoyalGem: "royal_gem",
    SeekingShield: "seeking_shield",
    HasteVial: "haste_vial",
    RocketSpear: "rocket_spear",
    ElectroBoots: "electro_boots",
    FrostFlake: "frost_flake",
  },
  DragonDuke: {
    FireHeart: "fire_heart",
    FlameBlower: "flame_blower",
    StunBlaster: "stun_blaster",
    ElectroFangs: "electro_fangs",
    RocketBackpack: "rocket_backpack",
  },
} as const;

export type EquipmentId = NestedValues<typeof EQUIPMENT_ID>;
