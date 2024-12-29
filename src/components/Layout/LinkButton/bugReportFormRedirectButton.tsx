import { LinkButton } from "components/UI";
import { BS_COLOR, EXTERNAL_URLS } from "data/constants";

export function BugReportFormRedirectButton() {
  return (
    <LinkButton
      color={BS_COLOR.Blue}
      link={EXTERNAL_URLS.BugReportForm}
      openInNewTab={true}
    >
      <i className="fa-solid fa-sheet-plastic"></i> Fill in this form
    </LinkButton>
  );
}
