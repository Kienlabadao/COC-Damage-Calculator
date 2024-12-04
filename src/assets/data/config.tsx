export const enum LocalStorageKey {
  ThemePref = "themePref",
}

export const enum PageURLS {
  HomePage = "/",
  ChangelogPage = "/changelog",
  ZapquakeCalcPage = "/calculator/zapquake",
  AdvanceCalcPage = "/calculator/advance",
  SettingPage = "/setting",
  ErrorPage = "/error",
}

export const enum ExternalURLS {
  BugReportForm = "https://forms.gle/weCLKkpg5py6PrGb9",
  TestForm = "https://forms.gle/cfXJ46tHb92HovHH7",
  Reddit = "https://www.reddit.com/user/Kienlabadao/",
  Discord = "https://discord.com/invite/6SDDRw68",
  SourceCode = "https://github.com/Kienlabadao/COC-Damage-Calculator",
  Donate = "https://buymeacoffee.com/kienlabadao",
  Zapquaker = "https://github.com/Kienlabadao/COC-Damage-Calculator",
  COCWiki = "https://buymeacoffee.com/kienlabadao",
}

export const enum Theme {
  Light = "light",
  Dark = "dark",
}

export const enum BSColor {
  Blue = "primary",
  Gray = "secondary",
  Green = "success",
  Red = "danger",
  Yellow = "warning",
  Aqua = "info",
  White = "light",
  Black = "dark",
  Orange = "orange",
  LightGreen = "light-green btn-success",
}

export const DEFAULT_THEME = Theme.Light;
export const SCROLL_POS_THRESHOLD = 1000;
export const DEV_MODE = true; // Change to false for production mode
