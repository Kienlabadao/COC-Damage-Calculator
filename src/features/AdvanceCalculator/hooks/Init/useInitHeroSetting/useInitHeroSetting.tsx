import { manageUseHardModeLocalStorage } from "features/AdvanceCalculator/utils/LocalStorageData/manageUseHardModeLocalStorage";
import { usePersistedState } from "hooks";
import { useCallback } from "react";

function initUseHardMode() {
  const { getOrStoreUseHardMode, storeUseHardMode } =
    manageUseHardModeLocalStorage();
  const [useHardMode, setUseHardMode] = usePersistedState<boolean>(
    getOrStoreUseHardMode,
    storeUseHardMode
  );

  const memoizedSetUseHardMode = useCallback(setUseHardMode, []);

  return [useHardMode, memoizedSetUseHardMode] as const;
}

export function useInitHeroSetting() {
  const [useHardMode, setUseHardMode] = initUseHardMode();

  return [useHardMode, setUseHardMode] as const;
}
