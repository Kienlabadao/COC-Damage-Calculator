import { ModifierItem } from "features/AdvanceCalculator/objects/modifierItem";
import { ModifierCardContainer } from "./modifierCardContainer";
import { ModifierSetting } from "./modifierSetting";
import { HIDE_MODIFIERS } from "features/AdvanceCalculator/config";

interface Props {
  modifierItemList: ModifierItem[];
  updateModifier: (
    modifierID: string,
    currentLevelPos?: number,
    use?: boolean
  ) => void;
  setAllModifiersToMax: () => void;
  setAllModifiersToMin: () => void;
}

export function ModifiersSection({
  modifierItemList,
  updateModifier,
  setAllModifiersToMax,
  setAllModifiersToMin,
}: Props) {
  return (
    <div className="mb-5">
      <h3 className="text-center">Modifier</h3>

      <ModifierSetting
        setAllModifiersToMax={setAllModifiersToMax}
        setAllModifiersToMin={setAllModifiersToMin}
      />

      <div className="row row-cols-6 justify-content-evenly gap-3 mt-5">
        {modifierItemList
          .filter((modifier) => !HIDE_MODIFIERS.includes(modifier.modifierID))
          .map((modifier) => (
            <ModifierCardContainer
              key={modifier.id}
              modifierItem={modifier}
              updateModifier={updateModifier}
            />
          ))}
      </div>
    </div>
  );
}
