import { IMAGE_PATH } from "data/constants";

export function NoDefenseFoundStatus() {
  return (
    <div className="row gy-5 align-items-center status-container">
      <div className="col-md-4 col-lg-3 d-flex justify-content-center">
        <img
          src={IMAGE_PATH.NoDefenseFound}
          className="status-container__img status-container__img--empty-search"
        />
      </div>
      <h3 className="col-md-8 col-lg-9 status-container__text mb-0">
        Uh oh! It looks like our Barbarian couldn't find any defenses that match
        your search. Maybe try broadening your search filter?
      </h3>
    </div>
  );
}
