import { ObjectValues } from "utils/objectUtils";

export const VALUE_BOUNDARY = {
  MIN: "min",
  MAX: "max",
} as const;

export type ValueBoundary = ObjectValues<typeof VALUE_BOUNDARY>;

export const LOCAL_STORAGE_KEY = {
  ThemePref: "themePref",
} as const;

export type LocalStorageKey = ObjectValues<typeof LOCAL_STORAGE_KEY>;

export const PAGE_URLS = {
  HomePage: "/",
  ChangelogPage: "/changelog",
  ZapquakeCalcPage: "/calculator/zapquake",
  AdvanceCalcPage: "/calculator/advance",
  SettingPage: "/setting",
  ErrorPage: "/error",
} as const;

export type PageURLS = ObjectValues<typeof PAGE_URLS>;

export const EXTERNAL_URLS = {
  BugReportForm: "https://forms.gle/weCLKkpg5py6PrGb9",
  TestForm: "https://forms.gle/cfXJ46tHb92HovHH7",
  Reddit: "https://www.reddit.com/user/Kienlabadao/",
  Discord: "https://discord.com/invite/6SDDRw68",
  SourceCode: "https://github.com/Kienlabadao/COC-Damage-Calculator",
  Donate: "https://buymeacoffee.com/kienlabadao",
  Zapquaker: "https://github.com/Kienlabadao/COC-Damage-Calculator",
  COCWiki: "https://buymeacoffee.com/kienlabadao",
} as const;

export type ExternalURLS = ObjectValues<typeof EXTERNAL_URLS>;

export const IMAGE_PATH = {
  Attack: "/images/other/attack.webp",
  AttackSpeed: "/images/other/attack_speed.webp",
  Repair: "/images/other/repair.webp",
} as const;

export type ImagePath = ObjectValues<typeof IMAGE_PATH>;

export const THEME = {
  Light: "light",
  Dark: "dark",
} as const;

export type Theme = ObjectValues<typeof THEME>;

export const BS_COLOR = {
  Blue: "primary",
  Gray: "secondary",
  Green: "success",
  Red: "danger",
  Yellow: "warning",
  Aqua: "info",
  White: "light",
  Black: "dark",
  Orange: "orange",
  LightGreen: "light-green btn-success",
  None: "none",
} as const;

export type BSColor = ObjectValues<typeof BS_COLOR>;
