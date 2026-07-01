import { TROOP_ID } from "./shared/id";
import {
  asGenericTroopData,
  asTargetOnlyTroopData,
  type AnyTroopData,
} from "./troopList.util";
import {
  Barbarian,
  Archer,
  Giant,
  Goblin,
  WallBreaker,
  Balloon,
  Wizard,
  Healer,
  Dragon,
  Pekka,
  BabyDragon,
  Miner,
  ElectroDragon,
  Yeti,
  DragonRider,
  ElectroTitan,
  RootRider,
  MeteorGolem,
} from "./elixir-troop";
import {
  Minion,
  HogRider,
  Valkyrie,
  Golem,
  Witch,
  LavaHound,
  Bowler,
  IceGolem,
  Headhunter,
  ApprenticeWarden,
  Druid,
  Furnace,
  RuinWitch,
} from "./dark-elixir-troop";

type ElixirTroopId =
  (typeof TROOP_ID.ElixirTroop)[keyof typeof TROOP_ID.ElixirTroop];

type DarkElixirTroopId =
  (typeof TROOP_ID.DarkElixirTroop)[keyof typeof TROOP_ID.DarkElixirTroop];

export const ElixirTroopList: Partial<Record<ElixirTroopId, AnyTroopData>> = {
  [TROOP_ID.ElixirTroop.Barbarian]: asGenericTroopData(Barbarian),
  [TROOP_ID.ElixirTroop.Archer]: asGenericTroopData(Archer),
  [TROOP_ID.ElixirTroop.Giant]: asGenericTroopData(Giant),
  [TROOP_ID.ElixirTroop.Goblin]: asGenericTroopData(Goblin),
  [TROOP_ID.ElixirTroop.WallBreaker]: asGenericTroopData(WallBreaker),
  [TROOP_ID.ElixirTroop.Balloon]: asGenericTroopData(Balloon),
  [TROOP_ID.ElixirTroop.Wizard]: asGenericTroopData(Wizard),
  [TROOP_ID.ElixirTroop.Healer]: asTargetOnlyTroopData(Healer),
  [TROOP_ID.ElixirTroop.Dragon]: asGenericTroopData(Dragon),
  [TROOP_ID.ElixirTroop.Pekka]: asGenericTroopData(Pekka),
  [TROOP_ID.ElixirTroop.BabyDragon]: asGenericTroopData(BabyDragon),
  [TROOP_ID.ElixirTroop.Miner]: asGenericTroopData(Miner),
  [TROOP_ID.ElixirTroop.ElectroDragon]: asGenericTroopData(ElectroDragon),
  [TROOP_ID.ElixirTroop.Yeti]: asGenericTroopData(Yeti),
  [TROOP_ID.ElixirTroop.DragonRider]: asGenericTroopData(DragonRider),
  [TROOP_ID.ElixirTroop.ElectroTitan]: asGenericTroopData(ElectroTitan),
  [TROOP_ID.ElixirTroop.RootRider]: asGenericTroopData(RootRider),
  [TROOP_ID.ElixirTroop.MeteorGolem]: asGenericTroopData(MeteorGolem),
};

export const DarkElixirTroopList: Partial<
  Record<DarkElixirTroopId, AnyTroopData>
> = {
  [TROOP_ID.DarkElixirTroop.Minion]: asGenericTroopData(Minion),
  [TROOP_ID.DarkElixirTroop.HogRider]: asGenericTroopData(HogRider),
  [TROOP_ID.DarkElixirTroop.Valkyrie]: asGenericTroopData(Valkyrie),
  [TROOP_ID.DarkElixirTroop.Golem]: asGenericTroopData(Golem),
  [TROOP_ID.DarkElixirTroop.Witch]: asGenericTroopData(Witch),
  [TROOP_ID.DarkElixirTroop.LavaHound]: asGenericTroopData(LavaHound),
  [TROOP_ID.DarkElixirTroop.Bowler]: asGenericTroopData(Bowler),
  [TROOP_ID.DarkElixirTroop.IceGolem]: asGenericTroopData(IceGolem),
  [TROOP_ID.DarkElixirTroop.Headhunter]: asGenericTroopData(Headhunter),
  [TROOP_ID.DarkElixirTroop.ApprenticeWarden]:
    asGenericTroopData(ApprenticeWarden),
  [TROOP_ID.DarkElixirTroop.Druid]: asTargetOnlyTroopData(Druid),
  [TROOP_ID.DarkElixirTroop.Furnace]: asTargetOnlyTroopData(Furnace),
  [TROOP_ID.DarkElixirTroop.RuinWitch]: asTargetOnlyTroopData(RuinWitch),
};
