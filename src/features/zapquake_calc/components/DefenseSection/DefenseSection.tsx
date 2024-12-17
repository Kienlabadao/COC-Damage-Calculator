import { useDefenseSectionContext } from "features/zapquake_calc/context/DefenseSectionContext";
import { DefenseCard } from "./DefenseCard";
import { SectionContainer } from "components";

export function DefenseSection() {
  const { defenseItemList, updateDefense } = useDefenseSectionContext();

  return (
    <>
      <SectionContainer>
        <div className="row row-cols-md-2 row-cols-xl-3 row-cols-xxl-4 gy-3">
          {defenseItemList.map((defense) => (
            <DefenseCard
              key={defense.id}
              defense={defense}
              updateDefense={updateDefense}
            />
          ))}
        </div>
      </SectionContainer>
    </>
  );
}
