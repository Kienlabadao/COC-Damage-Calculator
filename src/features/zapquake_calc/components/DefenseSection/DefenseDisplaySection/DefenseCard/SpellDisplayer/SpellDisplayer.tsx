import { CollapseContainer } from "components";
import { SpellCountItem } from "features/zapquake_calc/objects/spellCountItem";
import { SpellRow } from "./SpellRow";
import { v4 as uuidv4 } from "uuid";

interface Props {
  id: string;
  spellCountList: SpellCountItem[][];
}

export function SpellDisplayer({ id, spellCountList }: Props) {
  if (spellCountList.length === 0) {
    throw new Error(`SpellDisplayer ERROR: spellCountList cannot be empty.`);
  }

  const firstSpellCountItemList = spellCountList[0];
  const newSpellCountList = spellCountList.slice(1);

  return (
    <div className="spell-div container-fluid mt-3">
      <h5>Spell needed:</h5>
      <SpellRow spellCountItemList={firstSpellCountItemList} />
      {newSpellCountList.length !== 0 && (
        <CollapseContainer
          id={`showMore-${id}`}
          buttonContainerClassName={"text-center my-3"}
          defaultOpen={false}
        >
          <div className="row row-cols-1 gy-2 gx-0">
            {newSpellCountList.map((spellCountItemList) => (
              <div key={uuidv4()} className="col">
                <SpellRow spellCountItemList={spellCountItemList} />
              </div>
            ))}
          </div>
        </CollapseContainer>
      )}
    </div>
  );
}
