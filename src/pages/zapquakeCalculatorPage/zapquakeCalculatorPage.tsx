import { Footer, Navbar } from "components/Layout";
import { MainContainerWrapper } from "components/Wrapper";
import { PAGE_TITLE } from "data/constants";
import { ZapquakeCalculator } from "features/ZapquakeCalculator";
import { useSetPageTitle } from "hooks";

export function ZapquakeCalculatorPage() {
  useSetPageTitle(PAGE_TITLE.ZapquakeCalculatorPage);

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
