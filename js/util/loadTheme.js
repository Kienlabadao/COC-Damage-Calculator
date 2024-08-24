// This script is placed at the head tag so it can be load asap to prevent flashing
// ToggleTheme script responsible for toggle theme when user change theme, and do other stuff (changing theme icon)

let isDarkMode = LocalStorageUtils.loadBoolean("isDarkMode", false);

if (isDarkMode) {
    document.documentElement.setAttribute('data-bs-theme', "dark");
} else {
    document.documentElement.setAttribute('data-bs-theme', "light");
}