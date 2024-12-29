import { DEFAULT_SEARCH_QUERY } from "features/zapquake_calc/config";
import { manageHideEquipmentDestroyedDefenseLocalStorage } from "features/zapquake_calc/utils/LocalStorageData/manageHideEquipmentDestroyedDefenseLocalStorage";
import { manageHideImpossibleDestroyDefenseLocalStorage } from "features/zapquake_calc/utils/LocalStorageData/manageHideImpossibleDestroyDefenseLocalStorage";
import { manageHideNormalDefenseLocalStorage } from "features/zapquake_calc/utils/LocalStorageData/manageHideNormalDefenseLocalStorage";
import { usePersistedState } from "hooks";
import { useCallback, useState } from "react";

function initHideImpossibleDestroyDefense() {
  const {
    getOrStoreHideImpossibleDestroyDefense,
    storeHideImpossibleDestroyDefense,
  } = manageHideImpossibleDestroyDefenseLocalStorage();
  const [hideImpossibleDestroyDefense, setHideImpossibleDestroyDefense] =
    usePersistedState<boolean>(
      getOrStoreHideImpossibleDestroyDefense,
      storeHideImpossibleDestroyDefense
    );

  const memoizedSetHideImpossibleDestroyDefense = useCallback(
    setHideImpossibleDestroyDefense,
    []
  );

  return [
    hideImpossibleDestroyDefense,
    memoizedSetHideImpossibleDestroyDefense,
  ] as const;
}

function initHideEquipmentDestroyedDefense() {
  const {
    getOrStoreHideEquipmentDestroyedDefense,
    storeHideEquipmentDestroyedDefense,
  } = manageHideEquipmentDestroyedDefenseLocalStorage();
  const [hideEquipmentDestroyedDefense, setHideEquipmentDestroyedDefense] =
    usePersistedState<boolean>(
      getOrStoreHideEquipmentDestroyedDefense,
      storeHideEquipmentDestroyedDefense
    );

  const memoizedSetHideEquipmentDestroyedDefense = useCallback(
    setHideEquipmentDestroyedDefense,
    []
  );

  return [
    hideEquipmentDestroyedDefense,
    memoizedSetHideEquipmentDestroyedDefense,
  ] as const;
}

function initHideNormalDefense() {
  const { getOrStoreHideNormalDefense, storeHideNormalDefense } =
    manageHideNormalDefenseLocalStorage();
  const [hideNormalDefense, setHideNormalDefense] = usePersistedState<boolean>(
    getOrStoreHideNormalDefense,
    storeHideNormalDefense
  );

  const memoizedSetHideNormalDefense = useCallback(setHideNormalDefense, []);

  return [hideNormalDefense, memoizedSetHideNormalDefense] as const;
}

function initSearchQuery() {
  const [searchQuery, setSearchQuery] = useState(DEFAULT_SEARCH_QUERY);

  const memoizedSetSearchQuery = useCallback(setSearchQuery, []);

  return [searchQuery, memoizedSetSearchQuery] as const;
}

export function useInitDefenseSetting() {
  const [hideImpossibleDestroyDefense, setHideImpossibleDestroyDefense] =
    initHideImpossibleDestroyDefense();
  const [hideEquipmentDestroyedDefense, setHideEquipmentDestroyedDefense] =
    initHideEquipmentDestroyedDefense();
  const [hideNormalDefense, setHideNormalDefense] = initHideNormalDefense();
  const [searchQuery, memoizedSetSearchQuery] = initSearchQuery();

  return [
    hideImpossibleDestroyDefense,
    hideEquipmentDestroyedDefense,
    hideNormalDefense,
    searchQuery,
    setHideImpossibleDestroyDefense,
    setHideEquipmentDestroyedDefense,
    setHideNormalDefense,
    memoizedSetSearchQuery,
  ] as const;
}
