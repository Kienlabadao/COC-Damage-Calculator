import { LinkButton } from "components/UI";
import { BS_COLOR, EXTERNAL_URLS } from "data/constants";

export function TestFormRedirectButton() {
  return (
    <LinkButton
      color={BS_COLOR.Blue}
      link={EXTERNAL_URLS.TestForm}
      openInNewTab={true}
    >
      <i className="fa-solid fa-sheet-plastic"></i> Link to the form
    </LinkButton>
  );
}
