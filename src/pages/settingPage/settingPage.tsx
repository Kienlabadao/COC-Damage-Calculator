import { Footer, Navbar } from "components/Layout";
import { PAGE_TITLE } from "data/constants";
import { Setting } from "features/Setting";

import { useSetPageTitle } from "hooks";

export function SettingPage() {
  useSetPageTitle(PAGE_TITLE.SettingPage);

  return (
    <>
      <Navbar />

      <Setting />

      <Footer />
    </>
  );
}
