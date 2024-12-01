export const enum LocalStorageKey {
  ThemePref = "themePref",
}

export const enum URLS {
  HomePage = "/",
  ChangelogPage = "/changelog",
  ZapquakeCalcPage = "/calculator/zapquake",

  AdvanceCalcPage = "/calculator/advance",
  SettingPage = "/setting",
  ErrorPage = "/error",
}

export const enum Theme {
  Light = "light",
  Dark = "dark",
}

export const DEFAULT_THEME = Theme.Light;
export const SCROLL_POS_THRESHOLD = 1000;
export const DEV_MODE = true; // Change to false for production mode
