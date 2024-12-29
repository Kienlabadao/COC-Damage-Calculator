import { LinkButton } from "components/UI";
import { BS_COLOR, EXTERNAL_URLS } from "data/constants";

export function DiscordRedirectButton() {
  return (
    <LinkButton
      color={BS_COLOR.Blue}
      link={EXTERNAL_URLS.Discord}
      openInNewTab={true}
    >
      <i className="fa-brands fa-discord"></i> Discord
    </LinkButton>
  );
}
