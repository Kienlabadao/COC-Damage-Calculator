import {
  DiscordRedirectButton,
  DonateRedirectButton,
  RedditRedirectButton,
  SourceCodeRedirectButton,
} from "./LinkButton";

export function Footer() {
  return (
    <footer className="p-5 text-center mt-auto">
      <h4>Last Updated: 27/8/2024 (September 2024 Update)</h4>
      <h4>Made by Kienlabadao</h4>
      <div className="d-flex justify-content-center align-items-center flex-wrap gap-2">
        <div>
          <RedditRedirectButton />
        </div>
        <div>
          <DiscordRedirectButton />
        </div>
        <div>
          <SourceCodeRedirectButton />
        </div>
        <div>
          <DonateRedirectButton />
        </div>
      </div>
    </footer>
  );
}
