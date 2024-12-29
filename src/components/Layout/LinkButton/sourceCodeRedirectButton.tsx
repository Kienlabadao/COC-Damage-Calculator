import { LinkButton } from "components/UI";
import { BS_COLOR, EXTERNAL_URLS } from "data/constants";

export function SourceCodeRedirectButton() {
  return (
    <LinkButton
      color={BS_COLOR.Blue}
      link={EXTERNAL_URLS.SourceCode}
      openInNewTab={true}
    >
      <i className="fa-brands fa-github"></i> Source Code
    </LinkButton>
  );
}
