import {
  useInitTroop,
  useInitTroopSetting,
} from "features/AdvanceCalculator/hooks/Init";
import { TroopSetting } from "./troopSetting";
import { useOffensesSectionContext } from "features/AdvanceCalculator/contexts";
import { getActiveModifier } from "features/AdvanceCalculator/actions/ModifierItem";
import { TroopCardContainer } from "./troopCardContainer";

export function TroopsSection() {
  const { modifierItemList } = useOffensesSectionContext();

  const [troopItemList, updateTroop, setAllTroopsToMax, setAllTroopsToMin] =
    useInitTroop();
  const [useTroopDeathDamage, setUseTroopDeathDamage] = useInitTroopSetting();

  return (
    <div className="mb-5">
      <h3 className="text-center">Troop</h3>

      <TroopSetting
        useTroopDeathDamage={useTroopDeathDamage}
        setUseTroopDeathDamage={setUseTroopDeathDamage}
        setAllTroopsToMax={setAllTroopsToMax}
        setAllTroopsToMin={setAllTroopsToMin}
      />

      <div className="row row-cols-6 justify-content-evenly gap-3 mt-5">
        {troopItemList.map((troop) => {
          const activeModifier = getActiveModifier(
            troop.offenseID,
            troop.type,
            modifierItemList
          );

          return (
            <TroopCardContainer
              key={troop.id}
              troopItem={troop}
              activeModifier={activeModifier}
              updateTroop={updateTroop}
              useTroopDeathDamage={useTroopDeathDamage}
            />
          );
        })}
      </div>
    </div>
  );
}
