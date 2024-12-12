import { Navbar, Footer, MainContainer } from "components";
import { ZapquakeCalculator } from "./ZapquakeCalculator";

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
