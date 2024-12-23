export interface EquipmentDamageLog {
  dps?: number;
  dph?: number;
  damage?: number;
  extraDamage?: number;
}

export function createEquipmentDamageLog(
  dps?: number,
  dph?: number,
  damage?: number,
  extraDamage?: number
): EquipmentDamageLog {
  return {
    dps,
    dph,
    damage,
    extraDamage,
  };
}
