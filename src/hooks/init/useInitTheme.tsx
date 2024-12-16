import { Theme } from "data/constants";
import { usePersistedState } from "hooks";
import { manageThemeLocalStorage } from "utils/LocalStorageData/manageThemeLocalStorage";

export function useInitTheme() {
  const { getOrStoreTheme, storeTheme } = manageThemeLocalStorage();
  const [theme, setTheme] = usePersistedState<Theme>(
    getOrStoreTheme,
    storeTheme
  );

  return [theme, setTheme] as const;
}
