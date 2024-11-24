import { useState } from "react";
import { Theme, DEFAULT_THEME, LocalStorageKey } from "assets/data/config";

export interface Props {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export function useGetTheme(): Props {
  const themePreference = localStorage.getItem(LocalStorageKey.ThemePref);

  const initialTheme =
    themePreference === Theme.Dark
      ? Theme.Dark
      : themePreference === Theme.Light
      ? Theme.Light
      : DEFAULT_THEME;

  const [theme, setTheme] = useState<Theme>(initialTheme);

  return { theme, setTheme };
}
