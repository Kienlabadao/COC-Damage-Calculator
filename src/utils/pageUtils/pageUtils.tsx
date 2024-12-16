const body = document.body;
const html = document.documentElement;

// Get the max height of the page
export function getPageHeight() {
  return Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );
}

export function getCurrentScrollPos() {
  return document.documentElement.scrollTop;
}

// Scroll to the top of the page when user click scroll up button
export function scrollUp() {
  document.documentElement.scrollTop = 0;
}

// Scroll to the top of the page when user click scroll down button
export function scrollDown() {
  document.documentElement.scrollTop = getPageHeight();
}