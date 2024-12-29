import { Footer, Navbar } from "components/Layout";
import { MainContainerWrapper } from "components/Wrapper";
import { PAGE_TITLE } from "data/constants";
import { ZapquakeCalculator } from "features/ZapquakeCalculator";
import { useSetPageTitle } from "hooks";

export function ZapquakeCalcPage() {
  useSetPageTitle(PAGE_TITLE.ZapquakeCalcPage);

  return (
    <>
      <Navbar />

      <MainContainerWrapper>
        <ZapquakeCalculator />
      </MainContainerWrapper>

      <Footer />
    </>
  );
}
