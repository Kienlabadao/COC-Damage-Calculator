import { Button } from "components/Button";
import { BS_COLOR, Theme, THEME } from "data/constants";
import { usePersistedState } from "hooks/usePersistedState";
import { manageThemeLocalStorage } from "utils/LocalStorageData/manageThemeLocalStorage";
import { setPageTheme } from "utils/pageUtils";

export function ThemeToggler() {
  const { getOrStoreTheme, storeTheme } = manageThemeLocalStorage();
  const [theme, setTheme] = usePersistedState<Theme>(
    getOrStoreTheme,
    storeTheme
  );

  setPageTheme(theme);

  return (
    <Button className="btn--toggle-theme" color={BS_COLOR.None}>
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
    </Button>
  );
}
