import { URLS } from "assets/data/config";

const devMode = false; // Change to false for production mode

export function setupGlobalErrorHandler() {
  window.onerror = function (message, source, lineno, colno, error) {
    // If in development mode, don't redirect, just log the error
    if (devMode) {
      console.error("Error occurred:", message, {
        source,
        lineno,
        colno,
        error,
      });
      return false; // Return false to continue normal execution without redirect
    }
    // TODO: Log error onto console upon redirect to error page
    // If not in development mode, redirect to a custom error page
    window.location.href = URLS.ErrorPage; // Replace with your error page URL
    return true; // This prevents the default browser error handling
  };

  // Handle unhandled promise rejections
  window.addEventListener("unhandledrejection", (event) => {
    // In production, redirect to the error page
    if (!devMode) {
      console.error("Unhandled promise rejection:", event.reason);
      window.location.href = URLS.ErrorPage;
    } else {
      console.warn("Unhandled promise rejection:", event.reason);
    }
  });
}
