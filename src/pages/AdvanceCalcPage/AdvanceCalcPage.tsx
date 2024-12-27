import { Navbar, Footer, MainContainer } from "components";
import { AdvanceCalculator } from "features/advance_calc/AdvanceCalculator";

export function AdvanceCalcPage() {
  return (
    <>
      <Navbar />

      <MainContainer>
        <AdvanceCalculator />
      </MainContainer>

      <Footer />
    </>
  );
}
