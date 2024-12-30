import {
  SectionCardContainerWrapper,
  SectionContainerWrapper,
} from "components/Wrapper";
import {
  useInitDefense,
  useInitDefenseSetting,
} from "features/ZapquakeCalculator/hooks/Init";
import { OffenseItem } from "features/ZapquakeCalculator/objects/offenseItem";
import { DonatedLightningSpellItem } from "features/ZapquakeCalculator/objects/donatedLightningSpellItem/donatedLightningSpellItem";
import { EarthquakeOrder } from "features/ZapquakeCalculator/data/constants";
import { DefenseDisplaySection } from "./defenseDisplaySection";
import { DefenseSettingSection } from "./defenseSettingSection";
import {
  filterDefenseDisplayDataList,
  initDefenseDisplayDataList,
} from "features/ZapquakeCalculator/actions/DefenseDisplayData";
import { useCacheDefenseLog } from "features/ZapquakeCalculator/hooks";

interface Props {
  offenseItemList: OffenseItem[];
  donatedLightningSpellItem: DonatedLightningSpellItem;
  earthquakeOrder: EarthquakeOrder;
}

export function DefensesSection({
  offenseItemList,
  donatedLightningSpellItem,
  earthquakeOrder,
}: Props) {
  const [
    hideImpossibleDestroyDefense,
    hideEquipmentDestroyedDefense,
    hideNormalDefense,
    searchQuery,
    setHideImpossibleDestroyDefense,
    setHideEquipmentDestroyedDefense,
    setHideNormalDefense,
    setSearchQuery,
  ] = useInitDefenseSetting();

  const [
    defenseItemList,
    updateDefense,
    setAllDefensesToMax,
    setAllDefensesToMin,
  ] = useInitDefense();

  const defenseLogList = useCacheDefenseLog(
    defenseItemList,
    offenseItemList,
    donatedLightningSpellItem,
    earthquakeOrder
  );

  const defenseDisplayDataList = initDefenseDisplayDataList(
    defenseItemList,
    defenseLogList,
    updateDefense
  );

  const { filteredDefenseDisplayDataList, defenseCountLog } =
    filterDefenseDisplayDataList(
      defenseDisplayDataList,
      hideImpossibleDestroyDefense,
      hideEquipmentDestroyedDefense,
      hideNormalDefense,
      searchQuery
    );

  return (
    <>
      <SectionCardContainerWrapper className="mt-5">
        <DefenseSettingSection
          hideImpossibleDestroyDefense={hideImpossibleDestroyDefense}
          hideEquipmentDestroyedDefense={hideEquipmentDestroyedDefense}
          hideNormalDefense={hideNormalDefense}
          searchQuery={searchQuery}
          setHideImpossibleDestroyDefense={setHideImpossibleDestroyDefense}
          setHideEquipmentDestroyedDefense={setHideEquipmentDestroyedDefense}
          setHideNormalDefense={setHideNormalDefense}
          setSearchQuery={setSearchQuery}
          setAllDefensesToMax={setAllDefensesToMax}
          setAllDefensesToMin={setAllDefensesToMin}
          defenseCountLog={defenseCountLog}
        />
      </SectionCardContainerWrapper>

      <SectionContainerWrapper className="mt-5">
        <DefenseDisplaySection
          offenseItemList={offenseItemList}
          defenseDisplayDataList={filteredDefenseDisplayDataList}
        />
      </SectionContainerWrapper>
    </>
  );
}
