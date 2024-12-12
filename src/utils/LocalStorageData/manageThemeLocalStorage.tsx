import { DEFAULT_THEME } from "config/config";
import { LOCAL_STORAGE_KEY, Theme } from "data/constants";
import { isThemeType } from "utils/customObjectUtils";
import { clearItem, getItem, setItem } from "utils/localStorage";

export function manageThemeLocalStorage() {
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
        `manageThemeLocalStorage.getTheme ERROR: Value in storage key (${key}) is not theme type.`
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
        `manageThemeLocalStorage.getOrStoreTheme log: Value in storage key (${key}) is null. Set defaultTheme.`
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
