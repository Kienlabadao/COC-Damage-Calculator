import { IMAGE_PATH } from "data/constants";

export function ImpossibleDestroyStatus() {
  return (
    <div className="status-div status-container d-flex align-items-center my-3">
      <img
        className="image status-container__img"
        width="80"
        src={IMAGE_PATH.ImpossibleDestroy}
      />
      <div className="info status-container__text">
        It's impossible to destroy this defense with setup. Womp womp! 😔
      </div>
    </div>
  );
}
