import { Button, Checkbox } from "components";
import { BS_COLOR } from "data/constants";
import { memo } from "react";

interface Props {
  hideImpossibleDestroyDefense: boolean;
  hideEquipmentDestroyedDefense: boolean;
  hideNormalDefense: boolean;
  setHideImpossibleDestroyDefense: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setHideEquipmentDestroyedDefense: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setHideNormalDefense: React.Dispatch<React.SetStateAction<boolean>>;
  setAllDefensesToMax: () => void;
  setAllDefensesToMin: () => void;
}

export const DefenseSettingSection = memo(function DefenseSettingSection({
  hideImpossibleDestroyDefense,
  hideEquipmentDestroyedDefense,
  hideNormalDefense,
  setHideImpossibleDestroyDefense,
  setHideEquipmentDestroyedDefense,
  setHideNormalDefense,
  setAllDefensesToMax,
  setAllDefensesToMin,
}: Props) {
  function handleHideImpossibleDestroyDefense(value: boolean) {
    setHideImpossibleDestroyDefense(value);
  }
  function handleHideEquipmentDestroyedDefense(value: boolean) {
    setHideEquipmentDestroyedDefense(value);
  }
  function handleHideNormalDefense(value: boolean) {
    setHideNormalDefense(value);
  }

  return (
    <>
      <h2 className="text-center">Defense Section</h2>
      <hr />
      <div className="search-box shadow">
        <i className="fa fa-search" aria-hidden="true"></i>
        <input
          type="text"
          className="form-control search-box__input"
          placeholder="Search a defense"
          id="searchDefense"
        />
      </div>
      <div className="d-flex flex-wrap gap-2 mt-3">
        <Button color={BS_COLOR.Gray} onClick={setAllDefensesToMax}>
          Set All Defenses to Max Level
        </Button>
        <Button color={BS_COLOR.Gray} onClick={setAllDefensesToMin}>
          Set All Defenses to Min Level
        </Button>
      </div>
      <div>
        <Checkbox
          key={`hide_impossible_destroy`}
          id={`hide_impossible_destroy`}
          label={`Hide impossible to destroy defense`}
          isChecked={hideImpossibleDestroyDefense}
          onInput={handleHideImpossibleDestroyDefense}
          className="mt-2"
        />
        <Checkbox
          key={`hide_equipment_destroyed`}
          id={`hide_equipment_destroyed`}
          label={`Hide equipment destroyed defense`}
          isChecked={hideEquipmentDestroyedDefense}
          onInput={(isChecked: boolean) =>
            handleHideEquipmentDestroyedDefense(isChecked)
          }
          className="mt-2"
        />
        <Checkbox
          key={`hide_normal`}
          id={`hide_normal`}
          label={`Hide normal defense`}
          isChecked={hideNormalDefense}
          onInput={handleHideNormalDefense}
          className="mt-2"
        />
      </div>
      <hr />
      <h5 id="defenseCount" className="mb-0">
        Defenses Count: 24/24
      </h5>
    </>
  );
});
