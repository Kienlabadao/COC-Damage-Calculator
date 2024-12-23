import { SectionContainer } from "components";
import { useInitDefense } from "features/zapquake_calc/hooks/Init";
import {
  filterOffenseItemList,
  OffenseItem,
} from "features/zapquake_calc/objects/offenseItem";
import { DonatedLightningSpellItem } from "features/zapquake_calc/objects/donatedLightningSpellItem/donatedLightningSpellItem";
import { EarthquakeOrder } from "features/zapquake_calc/data/constants";
import { DefenseDisplaySection } from "./DefenseDisplaySection";
import { DefenseSettingSection } from "./DefenseSettingSection";
import { useInitDefenseSetting } from "features/zapquake_calc/hooks/Init/useInitDefenseSetting";
import { useInitDefenseDisplayDataList } from "features/zapquake_calc/hooks/Init/useInitDefenseDisplayDataList";
import { filterDefenseDisplayDataList } from "features/zapquake_calc/actions/DefenseDisplayData";

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
  const filteredOffenseItemList = filterOffenseItemList(
    offenseItemList,
    undefined,
    true
  );

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

  const defenseDisplayDataList = useInitDefenseDisplayDataList(
    defenseItemList,
    updateDefense,
    filteredOffenseItemList,
    donatedLightningSpellItem,
    earthquakeOrder
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
      <SectionContainer className="card-custom p-4 shadow my-5">
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
      </SectionContainer>

      <SectionContainer>
        <DefenseDisplaySection
          offenseItemList={filteredOffenseItemList}
          defenseDisplayDataList={filteredDefenseDisplayDataList}
        />
      </SectionContainer>
    </>
  );
}
