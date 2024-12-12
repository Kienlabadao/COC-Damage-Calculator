import { LinkButton } from "components/LinkButton";
import { BS_COLOR, EXTERNAL_URLS } from "data/constants";

export function Footer() {
  return (
    <footer className="p-5 text-center mt-auto">
      <h4>Last Updated: 27/8/2024 (September 2024 Update)</h4>
      <h4>Made by Kienlabadao</h4>
      <div className="d-flex justify-content-center align-items-center flex-wrap gap-2">
        <div>
          <LinkButton
            color={BS_COLOR.Orange}
            link={EXTERNAL_URLS.Reddit}
            openInNewTab={true}
          >
            <i className="fa-brands fa-reddit-alien"></i> Reddit
          </LinkButton>
        </div>
        <div>
          <LinkButton
            color={BS_COLOR.Blue}
            link={EXTERNAL_URLS.Discord}
            openInNewTab={true}
          >
            <i className="fa-brands fa-discord"></i> Discord
          </LinkButton>
        </div>
        <div>
          <LinkButton
            color={BS_COLOR.Blue}
            link={EXTERNAL_URLS.SourceCode}
            openInNewTab={true}
          >
            <i className="fa-brands fa-github"></i> Source Code
          </LinkButton>
        </div>
        <div>
          <LinkButton
            color={BS_COLOR.LightGreen}
            link={EXTERNAL_URLS.Donate}
            openInNewTab={true}
          >
            ☕ Buy me a coffee
          </LinkButton>
        </div>
      </div>
    </footer>
  );
}
