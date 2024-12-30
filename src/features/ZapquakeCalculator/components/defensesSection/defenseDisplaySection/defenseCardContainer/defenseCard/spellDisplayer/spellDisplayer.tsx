import {
  CollapseContainer,
  CollapseContainerButton,
  CollapseContainerContent,
} from "components/UI";
import { SpellCountItem } from "features/ZapquakeCalculator/objects/spellCountItem";
import { SpellRow } from "./spellRow";
import { v4 as uuidv4 } from "uuid";
import { BS_COLOR } from "data/constants";

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
        <CollapseContainer id={`showMore-${id}`} defaultOpen={false}>
          <div className="text-center my-3">
            <CollapseContainerButton color={BS_COLOR.Gray} />
          </div>
          <CollapseContainerContent>
            <div className="row row-cols-1 gy-3">
              {newSpellCountList.map((spellCountItemList) => (
                <div key={uuidv4()} className="col">
                  <SpellRow spellCountItemList={spellCountItemList} />
                </div>
              ))}
            </div>
          </CollapseContainerContent>
        </CollapseContainer>
      )}
    </div>
  );
}
