import { Theme } from "react-toastify";

export function setPageTheme(theme: Theme) {
  document.documentElement.setAttribute("data-bs-theme", theme);
}
