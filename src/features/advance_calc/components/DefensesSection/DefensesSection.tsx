import {
  filterDefenseDisplayDataList,
  initDefenseDisplayDataList,
} from "features/advance_calc/actions/DefenseDisplayData";
import { useCacheDefenseLog } from "features/advance_calc/hooks";
import { useInitDefense } from "features/advance_calc/hooks/Init";
import { AdvanceActionItem } from "features/advance_calc/objects/advanceActionItem";
import { useInitDefenseSetting } from "features/advance_calc/hooks/Init";
import { SectionContainer } from "components";
import { DefenseSettingSection } from "./DefenseSettingSection";
import { DefenseDisplaySection } from "./DefenseDisplaySection";

interface Props {
  actionList: AdvanceActionItem[];
}

export function DefensesSection({ actionList }: Props) {
  const [
    hideSurvivedDefense,
    hideDestroyedDefense,
    searchQuery,
    setHideSurvivedDefense,
    setHideDestroyedDefense,
    setSearchQuery,
  ] = useInitDefenseSetting();

  const [
    defenseItemList,
    updateDefense,
    setAllDefensesToMax,
    setAllDefensesToMin,
  ] = useInitDefense();

  const defenseLogList = useCacheDefenseLog(defenseItemList, actionList);

  const defenseDisplayDataList = initDefenseDisplayDataList(
    defenseItemList,
    defenseLogList,
    updateDefense
  );

  const { filteredDefenseDisplayDataList, defenseCountLog } =
    filterDefenseDisplayDataList(
      defenseDisplayDataList,
      hideSurvivedDefense,
      hideDestroyedDefense,
      searchQuery
    );

  return (
    <>
      <SectionContainer className="card-custom p-4 shadow my-5">
        <DefenseSettingSection
          hideSurvivedDefense={hideSurvivedDefense}
          hideDestroyedDefense={hideDestroyedDefense}
          searchQuery={searchQuery}
          setHideSurvivedDefense={setHideSurvivedDefense}
          setHideDestroyedDefense={setHideDestroyedDefense}
          setSearchQuery={setSearchQuery}
          setAllDefensesToMax={setAllDefensesToMax}
          setAllDefensesToMin={setAllDefensesToMin}
          defenseCountLog={defenseCountLog}
        />
      </SectionContainer>

      <SectionContainer>
        <DefenseDisplaySection
          defenseDisplayDataList={filteredDefenseDisplayDataList}
        />
      </SectionContainer>
    </>
  );
}
