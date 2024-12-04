import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from "react-router-dom";

import { PageURLS } from "assets/data/config";

import { HomePage, ChangelogPage, PageNotFoundPage, ErrorPage } from "pages";
import { ZapquakeCalcPage, AdvanceCalcPage, SettingPage } from "features";
import { AutoScrollToggler } from "components/AutoScrollToggler";
import { ToastContainer } from "react-toastify";

export default function App() {
  const router = createBrowserRouter([
    {
      path: `${PageURLS.HomePage}`,
      element: (
        <>
          <HomePage />
          <AutoScrollWrapper />
        </>
      ),
      errorElement: <PageNotFoundPage />,
    },
    {
      path: `${PageURLS.ZapquakeCalcPage}`,
      element: (
        <>
          <ZapquakeCalcPage />
          <AutoScrollWrapper />
        </>
      ),
    },
    {
      path: `${PageURLS.AdvanceCalcPage}`,
      element: (
        <>
          <AdvanceCalcPage />
          <AutoScrollWrapper />
        </>
      ),
    },
    {
      path: `${PageURLS.ChangelogPage}`,
      element: (
        <>
          <ChangelogPage />
          <AutoScrollWrapper />
        </>
      ),
    },
    {
      path: `${PageURLS.SettingPage}`,
      element: (
        <>
          <SettingPage />
          <AutoScrollWrapper />
        </>
      ),
    },
    {
      path: `${PageURLS.ErrorPage}`,
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
