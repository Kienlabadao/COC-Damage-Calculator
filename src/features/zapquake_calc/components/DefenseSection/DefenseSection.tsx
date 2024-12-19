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

interface Props {
  offenseItemList: OffenseItem[];
  donatedLightningSpellItem: DonatedLightningSpellItem;
  earthquakeOrder: EarthquakeOrder;
}

export function DefenseSection({
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
    setHideImpossibleDestroyDefense,
    setHideEquipmentDestroyedDefense,
    setHideNormalDefense,
  ] = useInitDefenseSetting();
  const [defenseDisplayDataList, setAllDefensesToMax, setAllDefensesToMin] =
    useInitDefense(
      filteredOffenseItemList,
      donatedLightningSpellItem,
      earthquakeOrder,
      hideImpossibleDestroyDefense,
      hideEquipmentDestroyedDefense,
      hideNormalDefense
    );

  return (
    <>
      <SectionContainer className="card-custom p-4 shadow my-5">
        <DefenseSettingSection
          hideImpossibleDestroyDefense={hideImpossibleDestroyDefense}
          hideEquipmentDestroyedDefense={hideEquipmentDestroyedDefense}
          hideNormalDefense={hideNormalDefense}
          setHideImpossibleDestroyDefense={setHideImpossibleDestroyDefense}
          setHideEquipmentDestroyedDefense={setHideEquipmentDestroyedDefense}
          setHideNormalDefense={setHideNormalDefense}
          setAllDefensesToMax={setAllDefensesToMax}
          setAllDefensesToMin={setAllDefensesToMin}
        />
      </SectionContainer>

      <SectionContainer>
        <DefenseDisplaySection
          defenseDisplayDataList={defenseDisplayDataList}
        />
      </SectionContainer>
    </>
  );
}
