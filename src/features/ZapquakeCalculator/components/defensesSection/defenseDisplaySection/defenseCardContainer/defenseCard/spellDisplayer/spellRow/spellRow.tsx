import {
  GameDataImageDisplayer,
  SIZE,
  DonatedOverlay,
  HeaderOverlayWrapper,
  LevelOverlay,
  OVERLAY_POSITION,
  SpellCountOverlay,
} from "components/Calculator";
import { convertSpellID } from "components/Calculator/GameDataCard/gameDataImageDisplayer/Helper/convertSpellID";
import { IMAGE_PATH } from "data/constants";
import { MAX_SPELL_COUNT } from "features/ZapquakeCalculator/config";
import { SpellCountItem } from "features/ZapquakeCalculator/objects/spellCountItem";
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
    const currentLevel = getSpellLevel(currentLevelPos);
    const isMaxed = isMaxLevelPos(currentLevelPos);
    const backgroundType = convertSpellID(spellID);

    isDonated ? (donatedSpellCount += count) : (spellCount += count);
    spellRowList.push(
      <GameDataImageDisplayer
        key={id}
        imgPath={imgPath}
        size={SIZE.Tall}
        backgroundType={backgroundType}
      >
        <HeaderOverlayWrapper>
          <SpellCountOverlay
            position={OVERLAY_POSITION.Header}
            spellCount={count}
          />
        </HeaderOverlayWrapper>

        {isDonated && <DonatedOverlay position={OVERLAY_POSITION.TopLeft} />}

        <LevelOverlay
          position={OVERLAY_POSITION.BottomLeft}
          level={currentLevel}
          isMaxed={isMaxed}
        />
      </GameDataImageDisplayer>
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
