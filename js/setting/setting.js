const statusDiv = document.getElementById("status");
const statusText = document.querySelector(".info");

function clearLocalStorage() {
    localStorage.clear();
    statusText.textContent = "Local storage cleared successfully! Please refresh your page to apply the change.";
    statusDiv.classList.remove("d-none");
    statusText.classList.remove("status-container__text--fail");
    statusText.classList.add("status-container__text--success");
}