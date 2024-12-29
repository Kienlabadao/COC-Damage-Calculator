import { IMAGE_PATH } from "data/constants";

function getSuperchargeImgList(superchargeLevel: number) {
  const superchargeImgs = [];

  for (let index = 0; index < superchargeLevel; index++) {
    superchargeImgs.push(<img key={index} src={IMAGE_PATH.Supercharge} />);
  }

  return superchargeImgs;
}

interface Props {
  superchargeLevel: number;
}

export function SuperchargeLevelStatCell({ superchargeLevel }: Props) {
  const superchargeImgs = getSuperchargeImgList(superchargeLevel);

  return (
    <div className="card-custom card-custom__stat supercharge">
      {superchargeImgs}
    </div>
  );
}
