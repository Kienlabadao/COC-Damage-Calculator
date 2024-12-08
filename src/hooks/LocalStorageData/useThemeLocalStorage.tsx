import { DEFAULT_THEME, LOCAL_STORAGE_KEY, Theme } from "assets/data/config";
import { isThemeType } from "utils/customObjectUtils";
import { clearItem, getItem, setItem } from "utils/localStorage";

export function useThemeLocalStorage() {
  const key = LOCAL_STORAGE_KEY.ThemePref;

  function storeTheme(theme: Theme): void {
    setItem(key, theme);
  }

  function getTheme(): Theme | null {
    const theme = getItem(key);

    if (isThemeType(theme)) {
      return theme;
    } else {
      console.warn(
        `useThemeLocalStorage.getTheme ERROR: Value in storage key (${key}) is not theme type.`
      );
      return null;
    }
  }

  function getOrStoreTheme(): Theme {
    const theme = getTheme();

    if (theme !== null) {
      return theme;
    } else {
      console.log(
        `useThemeLocalStorage.getOrStoreTheme log: Value in storage key (${key}) is null. Set defaultTheme.`
      );

      storeTheme(DEFAULT_THEME);
      return DEFAULT_THEME;
    }
  }

  function clearTheme(): void {
    clearItem(key);
  }

  return { storeTheme, getTheme, getOrStoreTheme, clearTheme };
}
