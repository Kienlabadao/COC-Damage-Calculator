import { manageHideEquipmentDestroyedDefenseLocalStorage } from "features/zapquake_calc/utils/LocalStorageData/manageHideEquipmentDestroyedDefenseLocalStorage";
import { manageHideImpossibleDestroyDefenseLocalStorage } from "features/zapquake_calc/utils/LocalStorageData/manageHideImpossibleDestroyDefenseLocalStorage";
import { manageHideNormalDefenseLocalStorage } from "features/zapquake_calc/utils/LocalStorageData/manageHideNormalDefenseLocalStorage";
import { usePersistedState } from "hooks";
import { useCallback } from "react";

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

export function useInitDefenseSetting() {
  const [hideImpossibleDestroyDefense, setHideImpossibleDestroyDefense] =
    initHideImpossibleDestroyDefense();
  const [hideEquipmentDestroyedDefense, setHideEquipmentDestroyedDefense] =
    initHideEquipmentDestroyedDefense();
  const [hideNormalDefense, setHideNormalDefense] = initHideNormalDefense();

  return [
    hideImpossibleDestroyDefense,
    hideEquipmentDestroyedDefense,
    hideNormalDefense,
    setHideImpossibleDestroyDefense,
    setHideEquipmentDestroyedDefense,
    setHideNormalDefense,
  ] as const;
}
