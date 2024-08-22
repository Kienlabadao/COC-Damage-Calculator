const lightStyleSheet = "/css/light.css";
const darkStyleSheet = "/css/dark.css";

const themeStyleSheet = document.getElementById("theme");
let isDarkMode = LocalStorageUtils.loadBoolean("isDarkMode", false);

if (isDarkMode) {
    document.documentElement.setAttribute('data-bs-theme', "dark");
    //themeStyleSheet.setAttribute('href', darkStyleSheet);
} else {
    document.documentElement.setAttribute('data-bs-theme', "light");
    //themeStyleSheet.setAttribute('href', lightStyleSheet);
}