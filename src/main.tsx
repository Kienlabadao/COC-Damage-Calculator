import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './assets/css/stylesheet.css';
import { URLS } from "./assets/data/config.tsx";

import HomePage from './pages/HomePage/HomePage.tsx';
import ZapquakePage from './pages/Calculator/ZapquakePage/ZapquakePage';
import AdvancePage from './pages/Calculator/AdvancePage/AdvancePage';
import ChangelogPage from './pages/ChangelogPage/ChangelogPage';
import SettingPage from './pages/SettingPage/SettingPage';
import ErrorPage from './pages/Error/ErrorPage/ErrorPage';

const router = createBrowserRouter([
  {
    path: `${URLS.HomePage}`,
    element: <HomePage />
  },
  {
    path: `${URLS.ZapquakeCalcPage}`,
    element: <ZapquakePage />
  },
  {
    path: `${URLS.AdvanceCalcPage}`,
    element: <AdvancePage />
  },
  {
    path: `${URLS.ChangelogPage}`,
    element: <ChangelogPage />
  },
  {
    path: `${URLS.SettingPage}`,
    element: <SettingPage />
  },
  {
    path: `${URLS.ErrorPage}`,
    element: <ErrorPage />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
