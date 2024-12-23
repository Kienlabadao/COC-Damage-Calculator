import { Button, Checkbox, CollapseContainer } from "components";
import { LiveTextInput } from "components/LiveTextInput";
import { BS_COLOR } from "data/constants";
import { DefenseCountLog } from "features/zapquake_calc/objects/defenseCountLog";
import { memo } from "react";

interface Props {
  hideImpossibleDestroyDefense: boolean;
  hideEquipmentDestroyedDefense: boolean;
  hideNormalDefense: boolean;
  searchQuery: string;
  setHideImpossibleDestroyDefense: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setHideEquipmentDestroyedDefense: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setHideNormalDefense: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setAllDefensesToMax: () => void;
  setAllDefensesToMin: () => void;
  defenseCountLog: DefenseCountLog;
}

export const DefenseSettingSection = memo(function DefenseSettingSection({
  hideImpossibleDestroyDefense,
  hideEquipmentDestroyedDefense,
  hideNormalDefense,
  searchQuery,
  setHideImpossibleDestroyDefense,
  setHideEquipmentDestroyedDefense,
  setHideNormalDefense,
  setSearchQuery,
  setAllDefensesToMax,
  setAllDefensesToMin,
  defenseCountLog,
}: Props) {
  const maxDefenseCount = defenseCountLog.maxDefenseCount;
  const remainingDefense = defenseCountLog.remainingDefense;
  const hiddenSettingDefenseCount = defenseCountLog.hiddenSettingDefenseCount;
  const hiddenSearchQueryDefenseCount =
    defenseCountLog.hiddenSearchQueryDefenseCount;
  const hiddenImpossibleDestroyDefenseCount =
    defenseCountLog.hiddenImpossibleDestroyDefenseCount;
  const hiddenEquipmentDestroyedDefenseCount =
    defenseCountLog.hiddenEquipmentDestroyedDefenseCount;
  const hiddenNormalDefenseCount = defenseCountLog.hiddenNormalDefenseCount;

  function handleHideImpossibleDestroyDefense(value: boolean) {
    setHideImpossibleDestroyDefense(value);
  }
  function handleHideEquipmentDestroyedDefense(value: boolean) {
    setHideEquipmentDestroyedDefense(value);
  }
  function handleHideNormalDefense(value: boolean) {
    setHideNormalDefense(value);
  }
  function handleSearchDefense(value: string) {
    setSearchQuery(value);
  }

  return (
    <>
      <h2 className="text-center">Defenses Section</h2>
      <hr />
      <LiveTextInput
        id={`search_defense`}
        value={searchQuery}
        onChange={handleSearchDefense}
        placeHolder={`Search a defense (case insensitive)`}
      />
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
          onChange={handleHideImpossibleDestroyDefense}
          className="mt-2"
        />
        <Checkbox
          key={`hide_equipment_destroyed`}
          id={`hide_equipment_destroyed`}
          label={`Hide equipment destroyed defense`}
          isChecked={hideEquipmentDestroyedDefense}
          onChange={(isChecked: boolean) =>
            handleHideEquipmentDestroyedDefense(isChecked)
          }
          className="mt-2"
        />
        <Checkbox
          key={`hide_normal`}
          id={`hide_normal`}
          label={`Hide normal defense`}
          isChecked={hideNormalDefense}
          onChange={handleHideNormalDefense}
          className="mt-2"
        />
      </div>
      <hr />
      <div>
        <div className="h5 mb-0">{`Defenses Count: ${remainingDefense}/${maxDefenseCount}`}</div>
        {remainingDefense !== maxDefenseCount && (
          <CollapseContainer
            id={`show_defense_count_detail`}
            openText={`Show Detail`}
            closeText={`Hide Detail`}
            buttonContainerClassName={`mt-2`}
          >
            <ul>
              {hiddenSettingDefenseCount > 0 && (
                <li>Defense hidden by setting: {hiddenSettingDefenseCount}</li>
              )}
              {hiddenSearchQueryDefenseCount > 0 && (
                <li>
                  Defense hidden by search query:{" "}
                  {hiddenSearchQueryDefenseCount}
                </li>
              )}
              {hiddenImpossibleDestroyDefenseCount > 0 && (
                <li>
                  Defense hidden by impossible destroy checkbox:{" "}
                  {hiddenImpossibleDestroyDefenseCount}
                </li>
              )}
              {hiddenEquipmentDestroyedDefenseCount > 0 && (
                <li>
                  Defense hidden by equipment destroyed checkbox:{" "}
                  {hiddenEquipmentDestroyedDefenseCount}
                </li>
              )}
              {hiddenNormalDefenseCount > 0 && (
                <li>
                  Defense hidden by normal checkbox: {hiddenNormalDefenseCount}
                </li>
              )}
            </ul>
          </CollapseContainer>
        )}
      </div>
    </>
  );
});
