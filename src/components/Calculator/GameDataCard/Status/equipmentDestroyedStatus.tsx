import { IMAGE_PATH } from "data/constants";

export function EquipmentDestroyedStatus() {
  return (
    <div className="status-div status-container d-flex align-items-center my-3">
      <img
        className="image status-container__img"
        width="80"
        src={IMAGE_PATH.EquipmentDestroyed}
      />
      <div className="info status-container__text">
        That heroes equipment setup is enough to destroy this defense without
        any spells needed. Huzzah! 🎉
      </div>
    </div>
  );
}
