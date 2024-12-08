import { Navbar, Footer, MainContainer } from "components";
import { ZapquakeCalculator } from "features/zapquake_calc/components";

export function ZapquakeCalcPage() {
  return (
    <>
      <Navbar />

      <MainContainer>
        <ZapquakeCalculator />
      </MainContainer>

      <Footer />
    </>
  );
}
