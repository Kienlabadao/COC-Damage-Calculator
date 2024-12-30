import {
  Button,
  Checkbox,
  CollapseContainer,
  CollapseContainerButton,
  CollapseContainerContent,
  LiveTextInput,
} from "components/UI";
import { BS_COLOR } from "data/constants";
import { DefenseCountLog } from "features/AdvanceCalculator/objects/defenseCountLog";
import {
  getHideDestroyedDefenseStorageKey,
  getHideSurvivedDefenseStorageKey,
} from "features/AdvanceCalculator/utils/advanceCalcUtils";
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

  const hideDestroyedDefenseCheckboxID = getHideDestroyedDefenseStorageKey();
  const hideSurvivedDefenseCheckboxID = getHideSurvivedDefenseStorageKey();

  function renderDefenseCountDisplayer() {
    const defenseCountDisplayer = (
      <div className="h5 mb-0">{`Defenses Count: ${remainingDefense}/${maxDefenseCount}`}</div>
    );

    if (remainingDefense === maxDefenseCount) {
      return defenseCountDisplayer;
    } else {
      return (
        <CollapseContainer id={`show_defense_count_detail`}>
          <div className="d-flex align-items-center gap-2 mt-2">
            {defenseCountDisplayer}
            <CollapseContainerButton
              color={BS_COLOR.Gray}
              openText={`Show Detail`}
              closeText={`Hide Detail`}
            />
          </div>
          <CollapseContainerContent>
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
          </CollapseContainerContent>
        </CollapseContainer>
      );
    }
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
          key={hideSurvivedDefenseCheckboxID}
          id={hideSurvivedDefenseCheckboxID}
          label={`Hide survived defense`}
          isChecked={hideSurvivedDefense}
          onChange={handleHideSurvivedDefense}
          className="mt-2"
        />
        <Checkbox
          key={hideDestroyedDefenseCheckboxID}
          id={hideDestroyedDefenseCheckboxID}
          label={`Hide destroyed defense`}
          isChecked={hideDestroyedDefense}
          onChange={(isChecked: boolean) =>
            handleHideDestroyedDefense(isChecked)
          }
          className="mt-2"
        />
      </div>
      <hr />
      <div>{renderDefenseCountDisplayer()}</div>
    </>
  );
});
