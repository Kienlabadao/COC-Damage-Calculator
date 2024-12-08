import { DefenseSection } from "../DefenseSection";
import { OffenseSection } from "../OffenseSection";
import { FilterSection } from "../FilterSection";
import { useInitOffense } from "features/zapquake_calc/hooks/init/useInitOffense";

export function ZapquakeCalculator() {
  const [offenseItemList, updateOffenseItemList] = useInitOffense();

  console.log("ZapquakeCalculator rendered");

  return (
    <>
      <OffenseSection
        offenseItemList={offenseItemList}
        updateOffenseItemList={updateOffenseItemList}
      ></OffenseSection>

      <FilterSection></FilterSection>

      <DefenseSection></DefenseSection>
    </>
  );
}
