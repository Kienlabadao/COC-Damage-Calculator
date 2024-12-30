import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from "react-router-dom";

import {
  HomePage,
  ChangelogPage,
  PageNotFoundPage,
  ErrorPage,
  ZapquakeCalculatorPage,
  AdvanceCalculatorPage,
  SettingPage,
} from "pages";
import { ToastContainer } from "react-toastify";
import { PAGE_URLS } from "data/constants";
import { AutoScrollToggler } from "components/Layout";

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
          <ZapquakeCalculatorPage />
          <AutoScrollWrapper />
        </>
      ),
    },
    {
      path: `${PAGE_URLS.AdvanceCalcPage}`,
      element: (
        <>
          <AdvanceCalculatorPage />
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
  const location = useLocation();

  return <AutoScrollToggler key={location.pathname} />;
};
