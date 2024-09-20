const errorPage = '/html/error.html';
const devMode = true;  // Change to false for production mode

window.onerror = function (message, source, lineno, colno, error) {
  // If in development mode, don't redirect, just log the error
  if (devMode) {
    return false;  // Return false to continue normal execution without redirect
  }

  // If not in development mode, redirect to a custom error page
  window.location.href = errorPage;  // Replace with your error page URL
  return true;  // This prevents the default browser error handling
};