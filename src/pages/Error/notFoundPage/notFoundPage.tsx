import { Link } from "react-router-dom";
import { PAGE_TITLE, PAGE_URLS } from "data/constants";
import { Footer, Navbar } from "components/Layout";
import {
  MainContainerWrapper,
  SectionContainerWrapper,
} from "components/Wrapper";
import { useSetPageTitle } from "hooks";

export function PageNotFoundPage() {
  useSetPageTitle(PAGE_TITLE.NotFoundPage);

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
              <div>
                Our barbarian couldn't find the page you were looking for.
              </div>
              <div>
                <span>Click </span>
                <Link to={PAGE_URLS.HomePage}>here</Link>
                <span> to go back to the home page.</span>
              </div>
            </div>
          </div>
        </SectionContainerWrapper>
      </MainContainerWrapper>

      <Footer />
    </>
  );
}
