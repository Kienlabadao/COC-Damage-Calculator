import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./assets/css/stylesheet.css";
import { URLS } from "./assets/data/config.tsx";

import {
  HomePage,
  ZapquakePage,
  AdvancePage,
  ChangelogPage,
  SettingPage,
  ErrorPage,
} from "pages";

const router = createBrowserRouter([
  {
    path: `${URLS.HomePage}`,
    element: <HomePage />,
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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
