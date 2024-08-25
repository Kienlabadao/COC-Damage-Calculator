const statusDiv = document.getElementById("status");
const statusText = document.querySelector(".info");

// Clear local storage and show status in page
function clearLocalStorage() {
    localStorage.clear();

    statusText.textContent = "Local storage cleared successfully! Please refresh your page to apply the change.";
    HTMLUtil.showDiv(statusDiv);
    HTMLUtil.setStatusTextSuccess(statusText);
}