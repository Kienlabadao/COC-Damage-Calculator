import { Theme, DEFAULT_THEME, LocalStorageKey } from "assets/data/config";
import { usePersistedState } from "hooks/usePersistedState";
import { useSetTheme } from "hooks/useSetTheme";

export function ThemeToggler() {
  const [theme, setTheme] = usePersistedState<Theme>(
    LocalStorageKey.ThemePref,
    DEFAULT_THEME
  );

  useSetTheme(theme);

  return (
    <button id="toggleTheme" className="btn btn--toggle-theme">
      <i
        className={`fa-solid fa-sun fa-2x ${
          theme === Theme.Dark ? "" : "d-none"
        }`}
        id="lightModeIcon"
        onClick={() => setTheme(Theme.Light)}
      ></i>
      <i
        className={`fa-solid fa-moon fa-2x ${
          theme === Theme.Light ? "" : "d-none"
        }`}
        id="darkModeIcon"
        onClick={() => setTheme(Theme.Dark)}
      ></i>
    </button>
  );
}
