import { Footer, Navbar } from "components/Layout";
import {
  MainContainerWrapper,
  SectionContainerWrapper,
} from "components/Wrapper";
import { PAGE_TITLE } from "data/constants";
import { useSetPageTitle } from "hooks";

export function ErrorPage() {
  useSetPageTitle(PAGE_TITLE.ErrorPage);

  return (
    <>
      <Navbar />

      <MainContainerWrapper>
        <header className="text-center mt-3">
          <img src="/images/other/confused.webp" height="200" />
          <h1 className="brand__text text-center">
            <span className="brand__text--orange">Uh oh!</span>
          </h1>
        </header>

        <SectionContainerWrapper className="mx-auto mt-5">
          <div>
            <div className="fs-3 fw-bold text-center">
              It looks like something went wrong!
            </div>
            <div className="fs-4 fw-bold mt-5">Here is what you can do:</div>
            <ul>
              <li>
                Try clearing your local storage in the{" "}
                <a href="/html/setting.html">Setting.</a>
              </li>
              <li>Try to replicate the error to see if it happens again.</li>
              <li>
                <div>
                  If it does, you’ve found a bug! Please report it to me via:
                </div>
                <ul className="mt-1">
                  <li>
                    <div className="d-flex align-items-center flex-wrap">
                      <div className="me-2">Reddit</div>
                      <div>
                        <a
                          href="https://www.reddit.com/user/Kienlabadao/"
                          target="_blank"
                          className="btn btn--orange"
                        >
                          <i className="fa-brands fa-reddit-alien"></i> Reddit
                        </a>
                      </div>
                    </div>
                  </li>
                  <li className="mt-3">
                    <div className="d-flex align-items-center flex-wrap">
                      <div className="me-2">Discord</div>
                      <div>
                        <a
                          href="https://discord.com/invite/6SDDRw68"
                          target="_blank"
                          className="btn btn-primary"
                        >
                          <i className="fa-brands fa-discord"></i> Discord
                        </a>
                      </div>
                    </div>
                  </li>
                  <li className="mt-3">
                    <div className="d-flex align-items-center flex-wrap">
                      <div className="me-2">Prefer staying anonymous?</div>
                      <div>
                        <a
                          href="https://forms.gle/weCLKkpg5py6PrGb9"
                          target="_blank"
                          className="btn btn-primary"
                        >
                          <i className="fa-solid fa-sheet-plastic"></i> Fill in
                          this form
                        </a>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
            <div className="fs-4 fw-bold">
              Thank you and sorry for the inconvenience! ❤
            </div>
          </div>
        </SectionContainerWrapper>
      </MainContainerWrapper>

      <Footer />
    </>
  );
}
