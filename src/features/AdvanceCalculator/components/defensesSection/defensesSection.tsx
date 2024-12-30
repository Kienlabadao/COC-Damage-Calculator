import {
  filterDefenseDisplayDataList,
  initDefenseDisplayDataList,
} from "features/AdvanceCalculator/actions/DefenseDisplayData";
import { useCacheDefenseLog } from "features/AdvanceCalculator/hooks";
import { useInitDefense } from "features/AdvanceCalculator/hooks/Init";
import { AdvanceActionItem } from "features/AdvanceCalculator/objects/advanceActionItem";
import { useInitDefenseSetting } from "features/AdvanceCalculator/hooks/Init";
import {
  SectionContainerWrapper,
  SectionCardContainerWrapper,
} from "components/Wrapper";
import { DefenseSettingSection } from "./defenseSettingSection";
import { DefenseDisplaySection } from "./defenseDisplaySection";

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
      <SectionCardContainerWrapper className="mt-5">
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
      </SectionCardContainerWrapper>

      <SectionContainerWrapper className="mt-5">
        <DefenseDisplaySection
          defenseDisplayDataList={filteredDefenseDisplayDataList}
        />
      </SectionContainerWrapper>
    </>
  );
}
