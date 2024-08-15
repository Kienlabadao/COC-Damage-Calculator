const statusDiv = document.getElementById("status");

function clearLocalStorage() {
    localStorage.clear();
    statusDiv.textContent = "Local storage cleared successfully! Please refresh your page to apply the change.";
    statusDiv.classList.remove("d-none");
    statusDiv.classList.remove("status-fail");
    statusDiv.classList.add("status-success");
}