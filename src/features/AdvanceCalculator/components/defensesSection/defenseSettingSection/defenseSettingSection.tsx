import { Button, Checkbox, CollapseContainer } from "components";
import { LiveTextInput } from "components/LiveTextInput";
import { BS_COLOR } from "data/constants";
import { DefenseCountLog } from "features/advance_calc/objects/defenseCountLog";
import { memo } from "react";

interface Props {
  hideSurvivedDefense: boolean;
  hideDestroyedDefense: boolean;
  searchQuery: string;
  setHideSurvivedDefense: React.Dispatch<React.SetStateAction<boolean>>;
  setHideDestroyedDefense: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setAllDefensesToMax: () => void;
  setAllDefensesToMin: () => void;
  defenseCountLog: DefenseCountLog;
}

export const DefenseSettingSection = memo(function DefenseSettingSection({
  hideSurvivedDefense,
  hideDestroyedDefense,
  searchQuery,
  setHideSurvivedDefense,
  setHideDestroyedDefense,
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
  const hiddenSurvivedDefenseCount = defenseCountLog.hiddenSurvivedDefenseCount;
  const hiddenDestroyedDefenseCount =
    defenseCountLog.hiddenDestroyedDefenseCount;

  function handleHideSurvivedDefense(value: boolean) {
    setHideSurvivedDefense(value);
  }
  function handleHideDestroyedDefense(value: boolean) {
    setHideDestroyedDefense(value);
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
          key={`hide_survived`}
          id={`hide_survived`}
          label={`Hide survived defense`}
          isChecked={hideSurvivedDefense}
          onChange={handleHideSurvivedDefense}
          className="mt-2"
        />
        <Checkbox
          key={`hide_destroyed`}
          id={`hide_destroyed`}
          label={`Hide destroyed defense`}
          isChecked={hideDestroyedDefense}
          onChange={(isChecked: boolean) =>
            handleHideDestroyedDefense(isChecked)
          }
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
              {hiddenSurvivedDefenseCount > 0 && (
                <li>
                  Defense hidden by survived checkbox:{" "}
                  {hiddenSurvivedDefenseCount}
                </li>
              )}
              {hiddenDestroyedDefenseCount > 0 && (
                <li>
                  Defense hidden by destroyed checkbox:{" "}
                  {hiddenDestroyedDefenseCount}
                </li>
              )}
            </ul>
          </CollapseContainer>
        )}
      </div>
    </>
  );
});
