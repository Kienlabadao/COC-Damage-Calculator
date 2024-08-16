const scrollUpBtn = document.getElementById("scrollUpBtn");
const scrollDownBtn = document.getElementById("scrollDownBtn");
const body = document.body;
const html = document.documentElement;

const minScroll = 1000;

window.addEventListener('scroll', () => {
    checkScroll();
});

function checkScroll() {
    const maxHeight = Math.max(
        body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight
      );
    const maxScroll = maxHeight - 1000;

    if (document.documentElement.scrollTop > minScroll) {
        scrollUpBtn.classList.remove("d-none");
    } else {
        scrollUpBtn.classList.add("d-none");
    }

    if (document.documentElement.scrollTop < maxScroll) {
        scrollDownBtn.classList.remove("d-none");
    } else {
        scrollDownBtn.classList.add("d-none");
    }
}

function scrollUp() {
    document.documentElement.scrollTop = 0;
}

function scrollDown() {
    const maxHeight = Math.max(
        body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight
      );
    document.documentElement.scrollTop = maxHeight;
}

checkScroll();