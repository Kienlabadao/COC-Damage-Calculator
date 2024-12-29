import { Footer, Navbar } from "components/Layout";
import { MainContainerWrapper } from "components/Wrapper";
import { PAGE_TITLE } from "data/constants";
import { AdvanceCalculator } from "features/advance_calc/AdvanceCalculator";
import { useSetPageTitle } from "hooks";

export function AdvanceCalcPage() {
  useSetPageTitle(PAGE_TITLE.AdvanceCalcPage);

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
