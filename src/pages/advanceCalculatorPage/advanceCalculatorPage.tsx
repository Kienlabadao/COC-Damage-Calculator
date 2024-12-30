import { Footer, Navbar } from "components/Layout";
import { MainContainerWrapper } from "components/Wrapper";
import { PAGE_TITLE } from "data/constants";
import { AdvanceCalculator } from "features/AdvanceCalculator";
import { useSetPageTitle } from "hooks";

export function AdvanceCalculatorPage() {
  useSetPageTitle(PAGE_TITLE.AdvanceCalculatorPage);

  return (
    <>
      <Navbar />

      <MainContainerWrapper>
        <AdvanceCalculator />
      </MainContainerWrapper>

      <Footer />
    </>
  );
}
