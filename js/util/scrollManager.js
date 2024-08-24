const scrollUpBtn = document.getElementById("scrollUpBtn");
const scrollDownBtn = document.getElementById("scrollDownBtn");
const body = document.body;
const html = document.documentElement;

const minScroll = 1000;

// Get the max height of the page
function getMaxHeight() {
    return Math.max(
        body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight
    );
}

// Start checking scroll when user scroll on the page
window.addEventListener('scroll', () => {
    checkScroll();
});

// Show and hide scroll up/down btn based on user scroll pos
function checkScroll() {
    const maxHeight = getMaxHeight();
    const maxScroll = maxHeight - 1000;
    const scrollPos = document.documentElement.scrollTop;

    if (scrollPos > minScroll) {
        HTMLUtil.showDiv(scrollUpBtn);
    } else {
        HTMLUtil.hideDiv(scrollUpBtn);
    }

    if (scrollPos < maxScroll) {
        HTMLUtil.showDiv(scrollDownBtn);
    } else {
        HTMLUtil.hideDiv(scrollDownBtn);
    }
}

// Scroll to the top of the page when user click scroll up button
function scrollUp() {
    document.documentElement.scrollTop = 0;
}

// Scroll to the top of the page when user click scroll down button
function scrollDown() {
    const maxHeight = getMaxHeight();
    document.documentElement.scrollTop = maxHeight;
}

checkScroll();