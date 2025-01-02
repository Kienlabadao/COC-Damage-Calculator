import {
  CollapseContainer,
  CollapseContainerButton,
  CollapseContainerContent,
} from "components/UI";
import { BS_COLOR } from "data/constants";

export function InstructionSection() {
  return (
    <div className="mt-4">
      <CollapseContainer id={"show_instruction"}>
        <div className="d-flex align-items-center gap-2">
          <h3>Instruction</h3>
          <CollapseContainerButton color={BS_COLOR.Gray} />
        </div>
        <CollapseContainerContent>
          <h4 className="text-decoration-underline">How to use:</h4>
          <ul>
            <li>
              <div className="fw-bold">Step 1: Select Spell Level</div>
              <ul>
                <li>Choose the appropriate spell level based on your needs.</li>
                <li>
                  <div>
                    You can also toggle the use of donated Lightning spells by:
                  </div>
                  <ul>
                    <li>
                      Clicking on
                      <strong>"Use donated lightning spell".</strong>
                    </li>
                    <li>Selecting its level.</li>
                    <li>
                      Choosing the quantity
                      <strong>(Must be between 0 and 3).</strong>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <div className="fw-bold">Step 2: Select Equipment Level</div>
              <ul>
                <li>
                  Choose the appropriate equipment level based on your needs.
                </li>
                <li>
                  <div>
                    If you're using both Earthquake Boots and Earthquake spells,
                    you can select which one will be used first. This is
                    important because earthquake type damage deal less damage
                    the more its target get hit by it.
                  </div>
                  <ul>
                    <li>
                      For more complex Earthquake order scenarios, visit the
                      <a href="/html/advance-calculator">Advance Calculator.</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <div className="fw-bold">Step 3: Calculate</div>
              <ul>
                <li>
                  Navigate to the Defense List section to see the results.
                </li>
                <li>
                  Select the appropriate defense level based on your needs.
                </li>
                <li>You can also search for a specific defense.</li>
              </ul>
            </li>
          </ul>
          <h4 className="text-decoration-underline">Note:</h4>
          <ul>
            <li>
              To exclude an offense from the calculation, set its level to
              <strong>0.</strong>
            </li>
            <li>
              <div>All of your options are saved for future use.</div>
              <ul>
                <li>
                  You can clear it in
                  <a href="/html/setting">Setting.</a>
                </li>
              </ul>
            </li>
            <li>
              While the website is supported on small screens like phones, it's
              recommended to use a larger screen, such as a monitor or tablet,
              for the best experience.
            </li>
          </ul>
        </CollapseContainerContent>
      </CollapseContainer>
    </div>
  );
}
