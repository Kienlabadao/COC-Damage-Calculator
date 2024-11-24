export function Footer() {
  return (
    <footer className="p-5 text-center mt-auto">
      <h4>Last Updated: 27/8/2024 (September 2024 Update)</h4>
      <h4>Made by Kienlabadao</h4>
      <div className="d-flex justify-content-center align-items-center flex-wrap gap-2">
        <div>
          <a
            href="https://www.reddit.com/user/Kienlabadao/"
            target="_blank"
            className="btn btn--reddit"
          >
            <i className="fa-brands fa-reddit-alien"></i> Reddit
          </a>
        </div>
        <div>
          <a
            href="https://discord.com/invite/6SDDRw68"
            target="_blank"
            className="btn btn-primary"
          >
            <i className="fa-brands fa-discord"></i> Discord
          </a>
        </div>
        <div>
          <a
            href="https://github.com/Kienlabadao/COC-Damage-Calculator"
            target="_blank"
            className="btn btn-primary"
          >
            <i className="fa-brands fa-github"></i> Source Code
          </a>
        </div>
        <div>
          <a
            href="https://buymeacoffee.com/kienlabadao"
            target="_blank"
            className="btn btn-success btn--donate"
          >
            ☕ Buy me a coffee
          </a>
        </div>
      </div>
    </footer>
  );
}
