import {
  useInitTroop,
  useInitTroopSetting,
} from "features/advance_calc/hooks/Init";
import { TroopSetting } from "./TroopSetting";
import { TroopCardWrapper } from "./TroopCardWrapper";
import { useOffensesSectionContext } from "features/advance_calc/contexts";

export function TroopsSection() {
  const { modifierItemList } = useOffensesSectionContext();

  const [troopItemList, updateTroop, setAllTroopsToMax, setAllTroopsToMin] =
    useInitTroop();
  const [useTroopDeathDamage, setUseTroopDeathDamage] = useInitTroopSetting();

  return (
    <div className="mb-5">
      <h3 className="text-center">Troop</h3>

      <TroopSetting
        className="setting-container"
        useTroopDeathDamage={useTroopDeathDamage}
        setUseTroopDeathDamage={setUseTroopDeathDamage}
        setAllTroopsToMax={setAllTroopsToMax}
        setAllTroopsToMin={setAllTroopsToMin}
      />

      <div className="row row-cols-6 justify-content-evenly gap-3 mt-5">
        {troopItemList.map((troop) => (
          <TroopCardWrapper
            key={troop.id}
            troopItem={troop}
            modifierItemList={modifierItemList}
            updateTroop={updateTroop}
            useTroopDeathDamage={useTroopDeathDamage}
          />
        ))}
      </div>
    </div>
  );
}
