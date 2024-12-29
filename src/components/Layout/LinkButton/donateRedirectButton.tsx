import { LinkButton } from "components/UI";
import { BS_COLOR, EXTERNAL_URLS } from "data/constants";

export function DonateRedirectButton() {
  return (
    <LinkButton
      color={BS_COLOR.LightGreen}
      link={EXTERNAL_URLS.Donate}
      openInNewTab={true}
    >
      ☕ Buy me a coffee
    </LinkButton>
  );
}
