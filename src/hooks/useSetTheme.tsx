import { Theme } from "assets/data/config";

export function useSetTheme(theme: Theme) {
  document.documentElement.setAttribute("data-bs-theme", theme);
}
