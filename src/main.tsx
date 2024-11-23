import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './assets/css/stylesheet.css';
import URLS from "./assets/data/urlMappings";

import HomePage from './pages/HomePage/HomePage.tsx';
import ZapquakePage from './pages/Calculator/ZapquakePage/ZapquakePage';
import AdvancePage from './pages/Calculator/AdvancePage/AdvancePage';
import ChangelogPage from './pages/ChangelogPage/ChangelogPage';
import SettingPage from './pages/SettingPage/SettingPage';
import ErrorPage from './pages/Error/ErrorPage/ErrorPage';

const router = createBrowserRouter([
  {
    path: `${URLS.homePage}`,
    element: <HomePage />
  },
  {
    path: `${URLS.zapquakeCalcPage}`,
    element: <ZapquakePage />
  },
  {
    path: `${URLS.advanceCalcPage}`,
    element: <AdvancePage />
  },
  {
    path: `${URLS.changelogPage}`,
    element: <ChangelogPage />
  },
  {
    path: `${URLS.settingPage}`,
    element: <SettingPage />
  },
  {
    path: `${URLS.errorPage}`,
    element: <ErrorPage />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
