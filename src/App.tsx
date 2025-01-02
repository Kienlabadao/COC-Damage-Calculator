import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { PAGE_URLS } from "data/constants";
import { AutoScrollToggler } from "components/Layout";
import { lazy } from "react";

const HomePage = lazy(() =>
  import("pages").then((module) => ({
    default: module.HomePage,
  }))
);
const ChangelogPage = lazy(() =>
  import("pages").then((module) => ({
    default: module.ChangelogPage,
  }))
);
const ZapquakeCalculatorPage = lazy(() =>
  import("pages").then((module) => ({
    default: module.ZapquakeCalculatorPage,
  }))
);
const AdvanceCalculatorPage = lazy(() =>
  import("pages").then((module) => ({
    default: module.AdvanceCalculatorPage,
  }))
);
const SettingPage = lazy(() =>
  import("pages").then((module) => ({
    default: module.SettingPage,
  }))
);
const ErrorPage = lazy(() =>
  import("pages").then((module) => ({
    default: module.ErrorPage,
  }))
);
const PageNotFoundPage = lazy(() =>
  import("pages").then((module) => ({
    default: module.PageNotFoundPage,
  }))
);

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
