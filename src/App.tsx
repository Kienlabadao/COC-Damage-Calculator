import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from "react-router-dom";

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
import { AutoScrollToggler } from "components/AutoScrollToggler";

export default function App() {
  const router = createBrowserRouter([
    {
      path: `${URLS.HomePage}`,
      element: (
        <>
          <HomePage />
          <AutoScrollWrapper />
        </>
      ),
      errorElement: <PageNotFoundPage />,
    },
    {
      path: `${URLS.ZapquakeCalcPage}`,
      element: (
        <>
          <ZapquakePage />
          <AutoScrollWrapper />
        </>
      ),
    },
    {
      path: `${URLS.AdvanceCalcPage}`,
      element: (
        <>
          <AdvancePage />
          <AutoScrollWrapper />
        </>
      ),
    },
    {
      path: `${URLS.ChangelogPage}`,
      element: (
        <>
          <ChangelogPage />
          <AutoScrollWrapper />
        </>
      ),
    },
    {
      path: `${URLS.SettingPage}`,
      element: (
        <>
          <SettingPage />
          <AutoScrollWrapper />
        </>
      ),
    },
    {
      path: `${URLS.ErrorPage}`,
      element: (
        <>
          <ErrorPage />
          <AutoScrollWrapper />
        </>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

const AutoScrollWrapper = () => {
  const location = useLocation(); // Now this is within the Router context

  return <AutoScrollToggler key={location.pathname} />;
};
