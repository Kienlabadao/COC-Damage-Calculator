import { DEFAULT_SEARCH_QUERY } from "features/AdvanceCalculator/config";
import { manageHideDestroyedDefenseLocalStorage } from "features/AdvanceCalculator/utils/LocalStorageData/manageHideDestroyedDefenseLocalStorage";
import { manageHideSurvivedDefenseLocalStorage } from "features/AdvanceCalculator/utils/LocalStorageData/manageHideSurvivedDefenseLocalStorage";
import { usePersistedState } from "hooks";
import { useCallback, useState } from "react";

function initHideSurvivedDefense() {
  const { getOrStoreHideSurvivedDefense, storeHideSurvivedDefense } =
    manageHideSurvivedDefenseLocalStorage();
  const [hideSurvivedDefense, setHideSurvivedDefense] =
    usePersistedState<boolean>(
      getOrStoreHideSurvivedDefense,
      storeHideSurvivedDefense
    );

  const memoizedSetHideSurvivedDefense = useCallback(
    setHideSurvivedDefense,
    []
  );

  return [hideSurvivedDefense, memoizedSetHideSurvivedDefense] as const;
}

function initHideDestroyedDefense() {
  const { getOrStoreHideDestroyedDefense, storeHideDestroyedDefense } =
    manageHideDestroyedDefenseLocalStorage();
  const [hideDestroyedDefense, setHideDestroyedDefense] =
    usePersistedState<boolean>(
      getOrStoreHideDestroyedDefense,
      storeHideDestroyedDefense
    );

  const memoizedSetHideDestroyedDefense = useCallback(
    setHideDestroyedDefense,
    []
  );

  return [hideDestroyedDefense, memoizedSetHideDestroyedDefense] as const;
}

function initSearchQuery() {
  const [searchQuery, setSearchQuery] = useState(DEFAULT_SEARCH_QUERY);

  const memoizedSetSearchQuery = useCallback(setSearchQuery, []);

  return [searchQuery, memoizedSetSearchQuery] as const;
}

export function useInitDefenseSetting() {
  const [hideSurvivedDefense, setHideSurvivedDefense] =
    initHideSurvivedDefense();
  const [hideDestroyedDefense, setHideDestroyedDefense] =
    initHideDestroyedDefense();
  const [searchQuery, setSearchQuery] = initSearchQuery();

  return [
    hideSurvivedDefense,
    hideDestroyedDefense,
    searchQuery,
    setHideSurvivedDefense,
    setHideDestroyedDefense,
    setSearchQuery,
  ] as const;
}
