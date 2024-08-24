// This script responsible for toggle theme when user change theme, and do other stuff (changing theme icon)
// LoadTheme is placed at the head tag so it can be load asap to prevent flashing

const lightModeIcon = document.getElementById("lightModeIcon");
const darkModeIcon = document.getElementById("darkModeIcon");

function toggleTheme() {
    isDarkMode = !isDarkMode;
    LocalStorageUtils.saveBoolean("isDarkMode", isDarkMode);
    setThemeMode(isDarkMode);
}

function setThemeMode(isDarkMode) {
    if (isDarkMode) {
        darkMode();
    } else {
        lightMode();
    }
}

function lightMode() {
    lightModeIcon.classList.add("d-none");
    darkModeIcon.classList.remove("d-none");

    document.documentElement.setAttribute('data-bs-theme', "light");
}

function darkMode() {
    lightModeIcon.classList.remove("d-none");
    darkModeIcon.classList.add("d-none");

    document.documentElement.setAttribute('data-bs-theme', "dark");
}

setThemeMode(isDarkMode);