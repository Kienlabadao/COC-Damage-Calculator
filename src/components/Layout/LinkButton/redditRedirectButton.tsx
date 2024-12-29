import { LinkButton } from "components/UI";
import { BS_COLOR, EXTERNAL_URLS } from "data/constants";

export function RedditRedirectButton() {
  return (
    <LinkButton
      color={BS_COLOR.Orange}
      link={EXTERNAL_URLS.Reddit}
      openInNewTab={true}
    >
      <i className="fa-brands fa-reddit-alien"></i> Reddit
    </LinkButton>
  );
}
