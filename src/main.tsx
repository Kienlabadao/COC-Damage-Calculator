import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "assets/css/stylesheet.css";
import { URLS } from "assets/data/config";

import {
  HomePage,
  ZapquakePage,
  AdvancePage,
  ChangelogPage,
  SettingPage,
  PageNotFoundPage,
  ErrorPage,
} from "pages";
import { setupGlobalErrorHandler } from "utils/errorHandler";

const router = createBrowserRouter([
  {
    path: `${URLS.HomePage}`,
    element: <HomePage />,
    errorElement: <PageNotFoundPage />,
  },
  {
    path: `${URLS.ZapquakeCalcPage}`,
    element: <ZapquakePage />,
  },
  {
    path: `${URLS.AdvanceCalcPage}`,
    element: <AdvancePage />,
  },
  {
    path: `${URLS.ChangelogPage}`,
    element: <ChangelogPage />,
  },
  {
    path: `${URLS.SettingPage}`,
    element: <SettingPage />,
  },
  {
    path: `${URLS.ErrorPage}`,
    element: <ErrorPage />,
  },
]);

setupGlobalErrorHandler();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
