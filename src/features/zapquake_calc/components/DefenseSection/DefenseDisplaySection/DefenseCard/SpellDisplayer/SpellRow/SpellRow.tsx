import {
  GameDataCardContainer,
  SIZE,
} from "components/CalculatorComponents/GameDataCardContainer";
import { MAX_SPELL_COUNT } from "features/zapquake_calc/config";
import { SpellCountItem } from "features/zapquake_calc/objects/spellCountItem";
import { spellDataUtils } from "utils/GameData/spellDataUtils";

function createSpellRow(spellCountItemList: SpellCountItem[]): {
  spellRowList: JSX.Element[];
  spellCount: number;
} {
  let spellRowList: JSX.Element[] = [];
  let spellCount = 0;

  spellCountItemList.forEach((spellCountItem) => {
    const id = spellCountItem.id;
    const spellID = spellCountItem.spellID;
    const currentLevelPos = spellCountItem.currentLevelPos;
    const count = spellCountItem.count;
    const isDonated = spellCountItem.isDonated;

    const { getSpellImage, isMaxLevelPos, getSpellLevel } =
      spellDataUtils(spellID);
    const imgPath = getSpellImage();

    spellCount += count;
    spellRowList.push(
      <GameDataCardContainer
        key={id}
        imgPath={imgPath}
        size={SIZE.Tall}
        level={getSpellLevel(currentLevelPos)}
        count={count}
        isMaxed={isMaxLevelPos(currentLevelPos)}
        isDonated={isDonated}
      />
    );
  });

  return { spellRowList, spellCount };
}

interface Props {
  spellCountItemList: SpellCountItem[];
}

export function SpellRow({ spellCountItemList }: Props) {
  if (spellCountItemList.length === 0) {
    throw new Error(`SpellRow ERROR: spellCountItemList cannot be empty.`);
  }

  const { spellRowList, spellCount } = createSpellRow(spellCountItemList);

  return (
    <div className="row gy-2 gx-1 align-items-center">
      <div className="col-9 col-sm-8 d-flex justify-content-end gap-2">
        {spellRowList}
      </div>
      <div className="col-3 col-sm-4">
        <div className="row row-cols-1">
          <span className="col fs-5 fw-bold">{`(${spellCount}/${MAX_SPELL_COUNT})`}</span>
        </div>
      </div>
    </div>
  );
}
