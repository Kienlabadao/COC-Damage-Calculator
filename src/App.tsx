import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from "react-router-dom";

import { HomePage, ChangelogPage, PageNotFoundPage, ErrorPage } from "pages";
import { AutoScrollToggler } from "components/AutoScrollToggler";
import { ToastContainer } from "react-toastify";
import { ZapquakeCalcPage } from "pages/ZapquakeCalcPage";
import { PAGE_URLS } from "data/constants";
import { AdvanceCalcPage } from "pages/AdvanceCalcPage";
import { SettingPage } from "pages/SettingPage";

export default function App() {
  const router = createBrowserRouter([
    {
      path: `${PAGE_URLS.HomePage}`,
      element: (
        <>
          <HomePage />
          <AutoScrollWrapper />
        </>
      ),
      errorElement: <PageNotFoundPage />,
    },
    {
      path: `${PAGE_URLS.ZapquakeCalcPage}`,
      element: (
        <>
          <ZapquakeCalcPage />
          <AutoScrollWrapper />
        </>
      ),
    },
    {
      path: `${PAGE_URLS.AdvanceCalcPage}`,
      element: (
        <>
          <AdvanceCalcPage />
          <AutoScrollWrapper />
        </>
      ),
    },
    {
      path: `${PAGE_URLS.ChangelogPage}`,
      element: (
        <>
          <ChangelogPage />
          <AutoScrollWrapper />
        </>
      ),
    },
    {
      path: `${PAGE_URLS.SettingPage}`,
      element: (
        <>
          <SettingPage />
          <AutoScrollWrapper />
        </>
      ),
    },
    {
      path: `${PAGE_URLS.ErrorPage}`,
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
      <ToastContainer />
    </>
  );
}

const AutoScrollWrapper = () => {
  const location = useLocation(); // Now this is within the Router context

  return <AutoScrollToggler key={location.pathname} />;
};
