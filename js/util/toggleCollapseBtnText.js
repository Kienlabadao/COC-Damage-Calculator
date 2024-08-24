// Called when collapse btn is pressed
function toggleHTMLCollapseBtnText(element) {
    toggleCollapseBtnText(element, HTMLUtil.getDataBoolean(element, "aria-expanded"));
}

// Change the text of collapse btn
function toggleCollapseBtnText(btn, isActive) { 
    if (isActive) {
        switch (btn.textContent) {
            case "Show More":
                btn.textContent = "Show Less"
                break;
            case "Show":
                btn.textContent = "Hide";
                break;
        }
    } else {
        switch (btn.textContent) {
            case "Show Less":
                btn.textContent = "Show More"
                break;
            case "Hide":
                btn.textContent = "Show";
                break;
        }
    }
}