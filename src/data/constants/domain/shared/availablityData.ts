export type AvailabilityData = {
  isTemporary?: boolean;
  isAvailable?: boolean;
  unavailableReason?: UnavailableReason;
};

export const UNAVAILABLE_REASON = {
  Temporary: "temporary",
  PoisonDamage: "poison_damage",
} as const;

export type UnavailableReason =
  (typeof UNAVAILABLE_REASON)[keyof typeof UNAVAILABLE_REASON];
