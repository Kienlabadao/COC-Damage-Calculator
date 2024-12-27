import { manageShowDetailActionListLocalStorage } from "features/advance_calc/utils/LocalStorageData/manageShowDetailActionListLocalStorage";
import { usePersistedState } from "hooks";
import { useCallback } from "react";

function initShowDetailActionList() {
  const { getOrStoreShowDetailActionList, storeShowDetailActionList } =
    manageShowDetailActionListLocalStorage();
  const [showDetailActionList, setShowDetailActionList] =
    usePersistedState<boolean>(
      getOrStoreShowDetailActionList,
      storeShowDetailActionList
    );

  const memoizedSetShowDetailActionList = useCallback(
    setShowDetailActionList,
    []
  );

  return [showDetailActionList, memoizedSetShowDetailActionList] as const;
}

export function useInitActionSetting() {
  const [showDetailActionList, setShowDetailActionList] =
    initShowDetailActionList();

  return [showDetailActionList, setShowDetailActionList] as const;
}
