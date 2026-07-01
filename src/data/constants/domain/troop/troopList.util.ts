import { type OffenseOnlyTroopData } from "./shared/offense-only-troop-data/offenseOnlyTroopData";
import { type TargetOnlyTroopData } from "./shared/target-only-troop-data/targetOnlyTroopData";
import { type TroopData } from "./shared/troop-data/troopData";

export const TROOP_KIND = {
  Generic: "generic",
  TargetOnly: "targetOnly",
  OffenseOnly: "offenseOnly",
} as const;

export type TroopKind = (typeof TROOP_KIND)[keyof typeof TROOP_KIND];

export type GenericTroopData = TroopData & {
  troopKind: typeof TROOP_KIND.Generic;
};

export type TargetOnlyTroopEntityData = TargetOnlyTroopData & {
  troopKind: typeof TROOP_KIND.TargetOnly;
};

export type OffenseOnlyTroopEntityData = OffenseOnlyTroopData & {
  troopKind: typeof TROOP_KIND.OffenseOnly;
};

export type AnyTroopData =
  | GenericTroopData
  | TargetOnlyTroopEntityData
  | OffenseOnlyTroopEntityData;

export function asGenericTroopData(troop: TroopData): GenericTroopData {
  return {
    ...troop,
    troopKind: TROOP_KIND.Generic,
  };
}

export function asTargetOnlyTroopData(
  troop: TargetOnlyTroopData,
): TargetOnlyTroopEntityData {
  return {
    ...troop,
    troopKind: TROOP_KIND.TargetOnly,
  };
}

export function asOffenseOnlyTroopData(
  troop: OffenseOnlyTroopData,
): OffenseOnlyTroopEntityData {
  return {
    ...troop,
    troopKind: TROOP_KIND.OffenseOnly,
  };
}

export function isGenericTroopData(
  troop: AnyTroopData,
): troop is GenericTroopData {
  return troop.troopKind === TROOP_KIND.Generic;
}

export function isTargetOnlyTroopData(
  troop: AnyTroopData,
): troop is TargetOnlyTroopEntityData {
  return troop.troopKind === TROOP_KIND.TargetOnly;
}

export function isOffenseOnlyTroopData(
  troop: AnyTroopData,
): troop is OffenseOnlyTroopEntityData {
  return troop.troopKind === TROOP_KIND.OffenseOnly;
}
