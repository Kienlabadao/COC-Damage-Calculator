import { Navbar, Footer, MainContainer } from "components";
import { AdvanceCalculator } from "./AdvanceCalculator";

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
