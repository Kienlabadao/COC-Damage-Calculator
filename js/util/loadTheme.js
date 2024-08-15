const lightStyleSheet = "/css/light.css";
const darkStyleSheet = "/css/dark.css";

const themeStyleSheet = document.getElementById("theme");
let isDarkMode = LocalStorageUtils.loadBoolean("isDarkMode", false);

if (isDarkMode) {
    themeStyleSheet.setAttribute('href', darkStyleSheet);
} else {
    themeStyleSheet.setAttribute('href', lightStyleSheet);
}