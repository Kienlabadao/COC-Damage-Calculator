import { THEME, Theme } from "data/constants";

export function isThemeType(value: string): value is Theme {
  return Object.values(THEME).includes(value as Theme);
}
