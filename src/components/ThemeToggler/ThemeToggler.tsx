import { Theme, THEME } from "assets/data/config";
import { useThemeLocalStorage } from "hooks/LocalStorageData/useThemeLocalStorage";
import { usePersistedState } from "hooks/usePersistedState";
import { useSetTheme } from "hooks/useSetTheme";

export function ThemeToggler() {
  const { getOrStoreTheme, storeTheme } = useThemeLocalStorage();
  const [theme, setTheme] = usePersistedState<Theme>(
    getOrStoreTheme,
    storeTheme
  );

  useSetTheme(theme);

  return (
    <button id="toggleTheme" className="btn btn--toggle-theme">
      <i
        className={`fa-solid fa-sun fa-2x ${
          theme === THEME.Dark ? "" : "d-none"
        }`}
        id="lightModeIcon"
        onClick={() => setTheme(THEME.Light)}
      ></i>
      <i
        className={`fa-solid fa-moon fa-2x ${
          theme === THEME.Light ? "" : "d-none"
        }`}
        id="darkModeIcon"
        onClick={() => setTheme(THEME.Dark)}
      ></i>
    </button>
  );
}
