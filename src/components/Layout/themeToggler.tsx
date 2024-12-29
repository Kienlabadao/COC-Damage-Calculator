import { setPageTheme } from "actions/Theme";
import { Button } from "components/UI";
import { BS_COLOR, THEME } from "data/constants";
import { useInitTheme } from "hooks/Init";

export function ThemeToggler() {
  const [theme, setTheme] = useInitTheme();

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
