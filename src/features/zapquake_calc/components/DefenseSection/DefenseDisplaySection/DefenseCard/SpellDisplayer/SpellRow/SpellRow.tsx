import {
  GameDataCardContainer,
  SIZE,
} from "components/CalculatorComponents/GameDataCardContainer";
import { IMAGE_PATH } from "data/constants";
import { MAX_SPELL_COUNT } from "features/zapquake_calc/config";
import { SpellCountItem } from "features/zapquake_calc/objects/spellCountItem";
import { spellDataUtils } from "utils/GameData/spellDataUtils";

function createSpellRow(spellCountItemList: SpellCountItem[]): {
  spellRowList: JSX.Element[];
  spellCount: number;
  donatedSpellCount: number;
} {
  let spellRowList: JSX.Element[] = [];
  let spellCount = 0;
  let donatedSpellCount = 0;

  spellCountItemList.forEach((spellCountItem) => {
    const id = spellCountItem.id;
    const spellID = spellCountItem.spellID;
    const currentLevelPos = spellCountItem.currentLevelPos;
    const count = spellCountItem.count;
    const isDonated = spellCountItem.isDonated;

    const { getSpellImage, isMaxLevelPos, getSpellLevel } =
      spellDataUtils(spellID);
    const imgPath = getSpellImage();

    isDonated ? (donatedSpellCount += count) : (spellCount += count);
    spellRowList.push(
      <GameDataCardContainer
        key={id}
        imgPath={imgPath}
        size={SIZE.Tall}
        level={getSpellLevel(currentLevelPos)}
        headerContent={count.toString()}
        isMaxed={isMaxLevelPos(currentLevelPos)}
        isDonated={isDonated}
      />
    );
  });

  return { spellRowList, spellCount, donatedSpellCount };
}

interface Props {
  spellCountItemList: SpellCountItem[];
}

export function SpellRow({ spellCountItemList }: Props) {
  const spellCountItemListLength = spellCountItemList.length;
  if (spellCountItemListLength === 0) {
    throw new Error(`SpellRow ERROR: spellCountItemList cannot be empty.`);
  }

  const { spellRowList, spellCount, donatedSpellCount } =
    createSpellRow(spellCountItemList);

  return (
    <div className="d-flex justify-content-center align-items-center gap-2">
      <div className="d-flex gap-2">{spellRowList}</div>
      <div>
        <div className="d-flex justify-content-center row row-cols-1">
          <span className="col fs-5 fw-bold">{`(${spellCount}/${MAX_SPELL_COUNT})`}</span>
          {donatedSpellCount > 0 && (
            <div className="col d-flex align-items-center">
              <div className="fs-5 fw-bold">{`+${donatedSpellCount}`}</div>
              <img height="18" src={IMAGE_PATH.Donated} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
