import { DEV_MODE, PageURLS } from "assets/data/config";

export function setupGlobalErrorHandler() {
  window.onerror = function () {
    // If in development mode, don't redirect, just log the error
    if (DEV_MODE) {
      // console.error("Error occurred:", message, {
      //   source,
      //   lineno,
      //   colno,
      //   error,
      // });
      return false; // Return false to continue normal execution without redirect
    }
    // TODO: Log error onto console upon redirect to error page
    // If not in development mode, redirect to a custom error page
    window.location.href = PageURLS.ErrorPage; // Replace with your error page URL
    return true; // This prevents the default browser error handling
  };

  // Handle unhandled promise rejections
  window.addEventListener("unhandledrejection", () => {
    // In production, redirect to the error page
    if (!DEV_MODE) {
      //console.error("Unhandled promise rejection:", event.reason);
      window.location.href = PageURLS.ErrorPage;
    } else {
      //console.warn("Unhandled promise rejection:", event.reason);
    }
  });
}
