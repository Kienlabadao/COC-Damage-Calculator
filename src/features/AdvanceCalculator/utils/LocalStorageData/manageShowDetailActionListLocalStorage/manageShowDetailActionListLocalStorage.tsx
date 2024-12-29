import { clearItem, getItem, setItem } from "utils/localStorage";
import { isBoolean } from "utils/objectUtils";
import { DEFAULT_SHOW_DETAIL_ACTION_LIST } from "features/advance_calc/config";
import { getShowDetailActionListStorageKey } from "../../advanceCalcUtils";

export function manageShowDetailActionListLocalStorage() {
  const key = getShowDetailActionListStorageKey();
  const defaultShowDetailActionList = DEFAULT_SHOW_DETAIL_ACTION_LIST;

  function storeShowDetailActionList(showDetailActionList: boolean): void {
    setItem(key, showDetailActionList);
  }

  function getShowDetailActionList(): boolean | null {
    const showDetailActionList = getItem(key);

    if (isBoolean(showDetailActionList)) {
      return showDetailActionList;
    } else {
      console.warn(
        `manageShowDetailActionListLocalStorage.getShowDetailActionList ERROR: Value in storage key (${key}) is not boolean. showDetailActionList: ${showDetailActionList}`
      );
    }

    return null;
  }

  function getOrStoreShowDetailActionList(): boolean {
    const showDetailActionList = getShowDetailActionList();

    if (showDetailActionList !== null) {
      return showDetailActionList;
    } else {
      console.log(
        `manageShowDetailActionListLocalStorage.getOrStoreShowDetailActionList log: Value in storage key (${key}) is null. Set defaultShowDetailActionList.`
      );

      storeShowDetailActionList(defaultShowDetailActionList);
      return defaultShowDetailActionList;
    }
  }

  function clearShowDetailActionList(): void {
    clearItem(key);
  }

  return {
    storeShowDetailActionList,
    getShowDetailActionList,
    getOrStoreShowDetailActionList,
    clearShowDetailActionList,
  };
}
