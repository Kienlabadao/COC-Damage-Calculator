import { manageUseTroopDeathDamageLocalStorage } from "features/AdvanceCalculator/utils/LocalStorageData/manageUseTroopDeathDamageLocalStorage";
import { usePersistedState } from "hooks";
import { useCallback } from "react";

function initUseTroopDeathDamage() {
  const { getOrStoreUseTroopDeathDamage, storeUseTroopDeathDamage } =
    manageUseTroopDeathDamageLocalStorage();
  const [useTroopDeathDamage, setUseTroopDeathDamage] =
    usePersistedState<boolean>(
      getOrStoreUseTroopDeathDamage,
      storeUseTroopDeathDamage
    );

  const memoizedSetUseTroopDeathDamage = useCallback(
    setUseTroopDeathDamage,
    []
  );

  return [useTroopDeathDamage, memoizedSetUseTroopDeathDamage] as const;
}

export function useInitTroopSetting() {
  const [useTroopDeathDamage, setUseTroopDeathDamage] =
    initUseTroopDeathDamage();

  return [useTroopDeathDamage, setUseTroopDeathDamage] as const;
}
