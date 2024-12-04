import { DefenseData, DefenseType } from "assets/data/game";
import { Navbar, Footer } from "components";

export function ZapquakeCalcPage() {
  const building = DefenseData["cannon"];
  console.log(building);
  console.log(DefenseType.Building);
  return (
    <>
      <Navbar />
      <Footer />
    </>
  );
}
