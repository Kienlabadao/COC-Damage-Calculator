import { Theme, LocalStorageKey } from "assets/data/config";

export function useSetTheme(theme: Theme): void {
  const validThemes = Object.values(Theme); // Dynamically retrieve themes

  if (validThemes.includes(theme)) {
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem(LocalStorageKey.ThemePref, theme);
  } else {
    throw new Error(`themeController.js ERROR: Invalid theme: ${theme}`);
  }
}
